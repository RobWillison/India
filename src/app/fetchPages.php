<?php

$db = new SQLite3('../../data/site.db');

$stmt = $db->prepare('SELECT * FROM page');

$result = $stmt->execute();
$workPieces = [];

while ($pageData = $result->fetchArray()) {
	$title = $pageData['name'];
	$image = $pageData['image'];
	$link = 'src/app/page.php?page=' . $pageData['id'];

	$workPieces[] = ['src' => $image, 'link' => $link, 'title' => $title];
}

echo json_encode($workPieces);