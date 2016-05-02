<?php
// Routes

use India\Dao\Work;
use India\Dao\Page;
use India\Dao\Comment;

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


$app->post('/comment/add', function ($request) {
    // Sample log message
    $this->logger->info("India '/' comment add");

    $allPostVars = $request->getParsedBody();

    $comment = new Comment();

    $comments = $comment->newComment($allPostVars['name'], $allPostVars['comment']);

    return;
});

$app->get('/comment/[{id}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' comment");

    $comment = new Comment();

    $comments = $comment->getCommentPage($args['id']);

    return json_encode($comments);
});

$app->get('/admin', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' home");

    // Render index view
    return $this->renderer->render($response, 'admin.phtml', $args);
});

$app->get('/admin/addWork', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' home");

    // Render index view
    return $this->renderer->render($response, 'addWorkPiece.phtml', $args);
});

$app->get('/admin/[{page}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' admin");

    // Render index view
    return $this->renderer->render($response, 'admin.phtml', $args);
});


$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("India '/' home");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
