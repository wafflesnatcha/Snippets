SELECT styles.id,
	styles.name,
	styles.url,
	styles.updateUrl,
	styles.code,
	style_meta.value as type
FROM styles INNER JOIN style_meta ON styles.id = style_meta.style_id
GROUP BY styles.id
ORDER BY styles.name ASC