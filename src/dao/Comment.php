<?php

namespace India\DAO;

use SQLite3;

class Comment {

	private $db;

	public function __construct()
	{
		$this->db = new SQLite3('../data/site.db');
	}

	public function getCommentPage($pageNumber = 0)
	{
		if ($pageNumber < 0) {
			return [];
		}

		$stmt = $this->db->prepare('SELECT * FROM comment ORDER BY id DESC LIMIT 50 OFFSET :offset');
		$stmt->bindValue(':offset', $pageNumber * 10, SQLITE3_INTEGER);

		$result = $stmt->execute();
		$comments = [];

		while ($comment = $result->fetchArray()) {
			$name = $comment['name'];
			$date = $comment['date'];
			$comment = $comment['comment'];

			$comments[] = ['name' => $name, 'date' => $date, 'comment' => $comment];
		}

		return $comments;
	}

	public function newComment($name, $comment) {
		if(!($name && $comment)) {
			return;
		}

		$date = date('d/m/Y');

		$stmt = $this->db->prepare('INSERT INTO comment (`name`, `comment`, `date`) VALUES (:name, :comment, :date)');
		$stmt->bindValue(':name', $name, SQLITE3_TEXT);
		$stmt->bindValue(':comment', $comment, SQLITE3_TEXT);
		$stmt->bindValue(':date', $date, SQLITE3_TEXT);

		$result = $stmt->execute();
	}
}
