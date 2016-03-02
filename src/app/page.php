<?php

$page = isset($_GET['page']) ? $_GET['page'] : 0;
$page = (int) $page;

$db = new SQLite3('../../data/site.db');

$stmt = $db->prepare('SELECT * FROM page WHERE id = :id');

$stmt->bindValue(':id', $page, SQLITE3_INTEGER);

$result = $stmt->execute();
$pageData = $result->fetchArray();

$title = $pageData['name'];
$image = '../../' . $pageData['image'];
$content = $pageData['content'];


include __DIR__  . '/../view/page.phtml';
