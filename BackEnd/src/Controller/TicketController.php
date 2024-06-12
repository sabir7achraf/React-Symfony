<?php

namespace App\Controller;

use App\Entity\Ticket;
use App\Entity\User;
use App\Repository\TicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Serializer\SerializerInterface;

class TicketController extends AbstractController
{
    #[Route('/api/tickets/current-month', name: 'api_tickets_current_month', methods: ['GET'])]
    public function getCurrentMonthTickets(TicketRepository $ticketRepository): JsonResponse
    {
        $startOfMonth = new \DateTime('first day of this month');
        $endOfMonth = new \DateTime('last day of this month');

        $tickets = $ticketRepository->createQueryBuilder('t')
            ->where('t.date BETWEEN :start AND :end')
            ->setParameter('start', $startOfMonth)
            ->setParameter('end', $endOfMonth)
            ->getQuery()
            ->getResult();

        $data = [];
        foreach ($tickets as $ticket) {
            $data[] = [
                'id' => $ticket->getId(),
                'title' => $ticket->getTitle(),
                'date' => $ticket->getDate()->format('Y-m-d'), // Formattage de la date
                'description' => $ticket->getDescription(),
            ];
        }
        return new JsonResponse($data);
    }

    #[Route('/api/tickets/{id}/reserve', name: 'api_ticket_reserve', methods: ['POST'])]
    public function reserveTicket(Ticket $ticket, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        if (!$ticket) {
            return new JsonResponse(['error' => 'Ticket not found'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $userId = $data['userId'] ?? null;

        if (!$userId) {
            return new JsonResponse(['error' => 'User ID is required'], 400);
        }

        $user = $entityManager->getRepository(User::class)->find($userId);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        try {
            $userTicket = new UserTicket();
            $userTicket->setUser($user);
            $userTicket->setTicket($ticket);
            $userTicket->setEtat('reservé');

            $entityManager->persist($userTicket);
            $entityManager->flush();

            return new JsonResponse(['success' => 'Ticket reserved successfully']);
        } catch (\Exception $e) {
            // Log the error message
            error_log('Error reserving ticket: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Internal Server Error'], 500);
        }
    }

    #[Route('/api/create_tickets', name: 'create_ticket', methods: ['POST'])]
    public function createTicket(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();

        if (!$this->isGranted('ROLE_ADMIN', $user)) {
            throw new AccessDeniedException('You do not have permission to create tickets.');
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data['title'], $data['description'], $data['date'])) {
            return new JsonResponse(['error' => 'Invalid data'], 400);
        }

        $ticket = new Ticket();
        $ticket->setTitle($data['title']);
        $ticket->setDescription($data['description']);
        $ticket->setDate(new \DateTime($data['date']));

        $entityManager->persist($ticket);
        $entityManager->flush();

        return new JsonResponse(['status' => 'Ticket created!'], 201);
    }
}
