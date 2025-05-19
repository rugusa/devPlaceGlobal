<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserProviderInterface;

final class AuthController extends AbstractController
{
    #[Route('/auth', name: 'app_auth')]
    public function index(): Response
    {
        return $this->render('auth/index.html.twig', [
            'controller_name' => 'AuthController',
        ]);
    }
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request, UserProviderInterface $userProvider, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $userProvider->loadUserByIdentifier($data['email'] ?? '');
        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse(['token' => $jwtManager->create($user)]);
    }
}
