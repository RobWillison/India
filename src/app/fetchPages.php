<?php

$db = new SQLite3('../../data/site.db');

$stmt = $db->prepare('SELECT * FROM page');

$result = $stmt->execute();
$pages = [];

while ($pageData = $result->fetchArray()) {
	$title = $pageData['name'];
	$image = $pageData['image'];
	$content = $pageData['content'];

	$pages[$pageData['id']] = ['title' => $title, 'src' => $image, 'content' => $content];
}

echo json_encode($pages);
