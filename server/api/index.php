<?php

//For debugging
error_reporting(E_ALL);
ini_set("display_errors", "On");

// Include the composer autoload file
require_once 'vendor/autoload.php';
require_once "class.upload.php";

$subdomains_array = array("http://localhost:9000");

$app = new \Slim\Slim(array());

$app->options('/(:x+)', function () use ($app) {
 
});

//[TODO]Remove suppressor
@$http_origin = $_SERVER['HTTP_ORIGIN'];

$allow_access_to_api = in_array($http_origin, $subdomains_array);

if ($allow_access_to_api) {
  header("Access-Control-Allow-Origin: $http_origin");
	
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

header('Access-Control-Allow-Credentials: true');

// Helper Method
require_once "helper_methods.php";

$app->response()->header('Content-Type', 'application/json');

$app->get('/', function () use ($app) {
  echo "Buy!";

});

// This route is used to upload media files
$app->post('/uploadMedia', function () use ($app) {
    try {

      $files = array();
    foreach ($_FILES['uploadedFile'] as $k => $l) {
        foreach ($l as $i => $v) {
          if (!array_key_exists($i, $files))
            $files[$i] = array();
            $files[$i][$k] = $v;
        }
    }

    foreach ($files as $file) {
        $date  = new DateTime();
        $month = new DateTime();
        $year  = new DateTime();

      $date=$date->format('Y-m-d_H-i-s');
      $month=$month->format('m');
      $year=$year->format('Y');
      
      $handle = new upload($file);
      if ($handle->uploaded) {
        $code=randomCode();
        $handle->file_new_name_body   =$date.'_'.$code;
        $handle->image_convert = 'jpg';
        $handle->dir_auto_create = true;
        $handle->dir_auto_chmod = true;
        $handle->dir_chmod = 0777;        
        $path=$_SERVER['DOCUMENT_ROOT'].'/starterApp/server/'.'/media/'.$year.'/'.$month.'/';
        $handle->process($path);
        if ($handle->processed) {
          $appResponseMessage["message"]="mediaUploaded";
            $handle->clean();
        } else {
            throw new Exception("errorOccured", 1);
        }
      }
    } 

    $appResponseJson=json_encode($appResponseMessage);
    $app->response->body($appResponseJson);

    } catch (Exception $e) {
      $appResponseJson = array('message' => $e->getMessage());
      $app->response->body(json_encode($appResponseJson));

    }
});

$app->run();
?>
