<?php

$db = new SQLite3('../../data/site.db');

$stmt = $db->prepare('SELECT * FROM PageText');

$result = $stmt->execute();
$pages = [];

while ($pageData = $result->fetchArray()) {
	$pageTitle = $pageData['pageName'];
	$image = $pageData['pageImage'];
	$content = $pageData['pageText'];

	$pages[] = ['title' => $pageTitle, 'src' => $image, 'content' => $content];
}

echo json_encode($pages);
