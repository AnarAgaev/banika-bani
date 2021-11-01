<?php
header('Content-type: text/plain; charset=utf-8');
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include "vendor/autoload.php";

use AmoCRM\{AmoAPI, AmoLead, AmoContact, AmoNote, AmoIncomingLeadForm, AmoAPIException};

$file_response = 'log.log';
// if (!empty($_GET)) {
// 	$fw = fopen($file_response, "a");
// 	fwrite($fw, "GET " . var_export($_GET, true) . "\n");
// 	fclose($fw);
// }

// if (!empty($_POST)) {
// 	$fw = fopen($file_response, "a");
// 	fwrite($fw, "POST " . var_export($_POST, true) . "\n");
// 	fclose($fw);
// }

try {
	
	// Авторизация
	$subdomain = 'romannshiftru';
	AmoAPI::oAuth2($subdomain);
	AmoAPI::$debug = true;
	AmoAPI::$debugLogFile = __DIR__.'/log.log';
	// Создаем новую заявку в неразобранном при добавлении из веб-формы
	$incomingLead = new AmoIncomingLeadForm();

	// Добавляем параметры сделки
	$lead = new AmoLead([
		'name' => 'Новая заявка Banika'
	]);
	$lead->addTags([ 'Banika' ]);
	$lead->setCustomFields([ 921399 => $_COOKIE['utm_source'] ]);
	$lead->setCustomFields([ 921393 => $_COOKIE['utm_content'] ]);
	$lead->setCustomFields([ 921395 => $_COOKIE['utm_medium'] ]);
	$lead->setCustomFields([ 921397 => $_COOKIE['utm_campaign'] ]);
	$lead->setCustomFields([ 921401 => $_COOKIE['utm_term'] ]);
	// $lead->setCustomFields([ 
	// 	603239 => [[

	// 		'value'  => 1323479
	// 	]]
	//  ]);

	$incomingLead->addIncomingLead($lead);

	$contact = new AmoContact([
		'name' => "Уточнить имя!"
	]);

	$contact->setCustomFields([
		63679 => [[
			'value' => $phone,
			'enum'  => 'WORK'
		]],
	]);
	if ($email != '') {
		$contact->setCustomFields([
			63681 => [[
				'value' => $email,
				'enum'  => 'WORK'
			]]
		]);
	}

	$incomingLead->addIncomingContact($contact);
	// Устанавливаем обязательные параметры 
	$incomingLead->setIncomingLeadInfo([
		'form_id'   => 921383,
		'form_page' => 'https://work-web.space/banika/',
		'form_name' => 'work-web.space/banika',
		'form_send_at' => time(),
	]);
	// Сохраняем заявку
	$data = $incomingLead->save();


	$incomingLead2 = new AmoIncomingLeadForm();
	$incomingLead2->fillByUid($data[0]);
	$lead = $incomingLead2->getParams();

	//  echo "<pre>";
   //  print_r($lead);
	//  echo "</pre>";
	$leadId = $lead['incoming_entities']['leads'][0]['id'];
	// echo $leadId;
	if($message2 !=''){
		// Создание нового события типа "обычное примечание", привязанного к сделке
		$note = new AmoNote([
			'element_id'   => $leadId,
			'note_type'    => AmoNote::COMMON_NOTETYPE,
			'element_type' => AmoNOTE::LEAD_TYPE,
			'text'         => $message2
		]);

	  // Сохранение события и получение его ID
		$noteId = $note->save();
	}
	// Принимаем заявки из неразобранного
	AmoAPI::acceptIncomingLeads([
		'accept' => [
			$data[0],
		],
		'user_id'   => 3863047,
		'status_id' => 17572111
	]);
	// print_r(AmoAPI::getAccount());
	echo "<pre>";
	print_r(AmoAPI::getAccount($with = 'custom_fields'));
	echo "</pre>";
	
} catch (AmoAPIException $e) {
	printf('Ошибка (%d): %s' . PHP_EOL, $e->getCode(), $e->getMessage());
}

