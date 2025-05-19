<?php

namespace App\Controller;

use App\Entity\Script;
use App\Form\ScriptType;
use App\Repository\ScriptRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Doctrine\DBAL\Connection;
use App\Entity\User;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;


#[Route('/api')]
final class ScriptController extends AbstractController
{

    #[Route( '/script' ,name: 'app_script_index', methods: ['GET'])]
    public function index(ScriptRepository $scriptRepository, SluggerInterface $slugger): JsonResponse
    {
        $scripts = $scriptRepository->findAll();

        $data = [];
        foreach ($scripts as $script) {
            $data[] = [
                'id' => $script->getId(),
                'title' => $script->getTitle(),
                'description' => $script->getDescription(),
                'price' => $script->getPrice(),
                'user_id' => $script->getUser() ? $script->getUser()->getId() : null,
                'created_at' => $script->getCreatedAt()->format('Y-m-d H:i:s'),
                'file_path' => $script->getFilePath(),

            ];
        }

        // Devolvemos la respuesta en formato JSON
        return new JsonResponse([
            'status' => 'success',
            'message' => 'Scripts fetched successfully',
            'data' => $data
        ]);

       /* return $this->render('script/index.html.twig', [
            'scripts' => $scriptRepository->findAll(),
        ]);*/
    }

    /*#[Route('/script/new', name: 'app_script_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager,SluggerInterface $slugger): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['status'=>'error','message'=>'No autenticado'], 401);
        }
        $data = json_decode($request->getContent(), true); // Obtenemos los datos en formato JSON




        $title = $request->request->get('title');
        $description = $request->request->get('description');
        $price = $request->request->get('price');
        $createdAt = $request->request->get('created_at');
        $uploadedFile = $request->files->get('file');
        if (!$title || !$description || !$price || !$createdAt || !$uploadedFile) {
            return new JsonResponse(['status'=>'error','message'=>'Faltan campos o archivo'], 400);
        }

        $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $uploadedFile->guessExtension();

        try {
            $uploadDir = $this->getParameter('scripts_directory');
            $uploadedFile->move($uploadDir, $newFilename);
        } catch (FileException $e) {
            return new JsonResponse(['status' => 'error', 'message' => 'Failed to upload file'], 500);
        }

        $script = new Script();
        $script->setTitle($title);
        $script->setDescription($description);
        $script->setPrice($price);
        $script->setUser($user);
        $script->setCreatedAt(new \DateTime($createdAt));
        $script->setFilePath($newFilename);
        $entityManager->persist($script);
        $entityManager->flush();

        $fileUrl = '/uploads/scripts/' . $script->getFilePath();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Script created successfully',
            'data' => [
                'id' => $script->getId(),
                'title' => $script->getTitle(),
                'file_url' => $fileUrl
            ]
        ], 201);
    }
*/
    #[Route('/script/new', name: 'app_script_new', methods: ['POST'])]
    public function new(
        Request $request,
        EntityManagerInterface $entityManager,
        SluggerInterface $slugger
    ): JsonResponse {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['status'=>'error','message'=>'No autenticado'], 401);
        }

        $title       = $request->request->get('title');
        $description = $request->request->get('description');
        $price       = $request->request->get('price');
        $createdAt   = $request->request->get('created_at');
        $file        = $request->files->get('file');

        if (null === $title
            || null === $description
            || null === $price
            || null === $createdAt
            || null === $file
        ) {
            return new JsonResponse(
                ['status'=>'error','message'=>'Faltan campos o archivo'],
                400
            );
        }

        // Slugging del nombre de archivo
        $orig        = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safe        = $slugger->slug($orig);
        $newFilename = $safe.'-'.uniqid().'.'.$file->guessExtension();
        $file->move($this->getParameter('scripts_directory'), $newFilename);

        $script = new Script();
        $script
            ->setTitle($title)
            ->setDescription($description)
            ->setPrice((float)$price)
            ->setUser($user)
            ->setCreatedAt(new \DateTime($createdAt))
            ->setFilePath($newFilename)
        ;

        $entityManager->persist($script);
        $entityManager->flush();

        return new JsonResponse([
            'status' => 'success',
            'message'=> 'Script creado',
            'data'   => ['id'=>$script->getId()]
        ], 201);
    }

    #[Route('/show/{id}', name: 'app_script_show', methods: ['GET'])]
    public function show(Script $script): JsonResponse
    {
        if (!$script) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Script not found'
            ], 404);
        }

        $data = [
            'id' => $script->getId(),
            'title' => $script->getTitle(),  // Ajusta según los campos de tu entidad
            'description' => $script->getDescription(),
            'price' => $script->getPrice(),
            'user_id' => $script->getUser(),
            'created_at' => $script->getCreatedAt()->format('Y-m-d H:i:s'),
            'file_path' => $script->getFilePath(),
        ];

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Script fetched successfully',
            'data' => $data
        ]);
        /*return $this->render('script/show.html.twig', [
            'script' => $script,
        ]);*/
    }

    #[Route('/{id}/edit', name: 'app_script_edit', methods: ['POST'])]
    public function edit(
        Request $request,
        Script $script,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): JsonResponse {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'No autenticado'], 401);
        }

        // 1) Leer los campos de form-data
        $title       = $request->request->get('title');
        $description = $request->request->get('description');
        $price       = $request->request->get('price');
        $createdAt   = $request->request->get('created_at');

        if (
            $title       === null ||
            $description === null ||
            $price       === null ||
            $createdAt   === null
        ) {
            return new JsonResponse(
                ['status' => 'error', 'message' => 'Faltan campos requeridos'],
                400
            );
        }

        // 2) Actualizar datos
        $script->setTitle($title)
            ->setDescription($description)
            ->setPrice((float)$price)
            ->setCreatedAt(new \DateTime($createdAt))
            ->setUser($user)
        ;

        // 3) (Opcional) si envías un fichero nuevo, guárdalo también
        $uploadedFile = $request->files->get('file');
        if ($uploadedFile) {
            $orig = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
            $safe = $slugger->slug($orig);
            $newFilename = $safe.'-'.uniqid().'.'.$uploadedFile->guessExtension();

            try {
                $uploadDir = $this->getParameter('scripts_directory');
                $uploadedFile->move($uploadDir, $newFilename);
                $script->setFilePath($newFilename);
            } catch (FileException $e) {
                return new JsonResponse(['status'=>'error','message'=>'Error al guardar el fichero'], 500);
            }
        }

        $em->flush();

        return new JsonResponse(['status'=>'success','message'=>'Script actualizado']);
    }


    /*public function edit(Request $request, Script $script, EntityManagerInterface $entityManager): JsonResponse
    {

        $data = json_decode($request->getContent(), true);
        $script->setTitle($data['title']);
        $script->setDescription($data['description']);
        $script->setPrice($data['price']);
        $user = $entityManager->getRepository(User::class)->find($data['user_id']);
        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'User not found'], 404);
        }
        $script->setUser($user);
        $script->setCreatedAt($data['created_at']);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Script updated']);

    }

    #[Route('/{id}', name: 'app_script_delete', methods: ['POST'])]
    public function delete(Request $request, Script $script, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($script);
        $entityManager->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Script deleted successfully'
        ]);
    }

    #[Route('/user/{id}/scripts', name: 'app_user_scripts', methods: ['GET'])]
    public function getUserScripts(int $id, ScriptRepository $scriptRepository): JsonResponse
    {
        $scripts = $scriptRepository->findBy(['user' => $id]);

        $data = [];
        foreach ($scripts as $script) {
            $data[] = [
                'id' => $script->getId(),
                'title' => $script->getTitle(),
                'description' => $script->getDescription(),
                'price' => $script->getPrice(),
                'file_path' => $script->getFilePath(),
                'created_at' => $script->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }

        return new JsonResponse([
            'status' => 'success',
            'message' => 'User scripts fetched successfully',
            'data' => $data
        ]);
    }*/


    #[Route('/script/{id}/downloadScript', name: 'app_script_download', methods: ['GET'])]
    public function downloadScript(int $id, EntityManagerInterface $entityManager): Response
    {
        $script = $entityManager->getRepository(Script::class)->find($id);

        if (!$script) {
            return new JsonResponse(['status' => 'error', 'message' => 'Script not found'], 404);
        }

        $filePath = $this->getParameter('scripts_directory') . '/' . $script->getFilePath();

        if (!file_exists($filePath)) {
            return new JsonResponse(['status' => 'error', 'message' => 'File not found on server'], 404);
        }

        return $this->file($filePath, $script->getFilePath());
    }

    #[Route('/my/scripts', name: 'app_my_scripts', methods: ['GET'])]
    public function getMyScripts(ScriptRepository $scriptRepository): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'No autenticado'], 401);
        }
        $scripts = $scriptRepository->findBy(['user' => $user->getId()]);

        $data = [];
        foreach ($scripts as $script) {
            $data[] = [
                'id' => $script->getId(),
                'title' => $script->getTitle(),
                'description' => $script->getDescription(),
                'price' => $script->getPrice(),
                'file_path' => $script->getFilePath(),
                'created_at' => $script->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Tus scripts',
            'data' => $data
        ]);
    }





}
