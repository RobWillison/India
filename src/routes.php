<?php
// Routes

use India\Entites\Work;
use India\Entites\Page;

$app->get('/work', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' work");

    $work = new Work();

    $workPieces = $work->getAll();

    return json_encode($workPieces);
});


$app->get('/page/all', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' pages all");

    $page = new Page();

    $pages = $page->getAll();

    // Render index view
    return json_encode($pages);
});

$app->get('/page/[{id}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' pages");

    $work = new Work();

    $pageData = $work->getById($args['id']);

    $args['title'] = $pageData['title'];
    $args['image'] = $pageData['image'];
    $args['content'] = $pageData['content'];

    // Render index view
    return $this->renderer->render($response, 'page.phtml', $args);
});


$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' home");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
