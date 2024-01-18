<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer/PHPMailer.php';
require 'PHPMailer/PHPMailer/SMTP.php';

include 'secrets.php'

// Функція для отримання IP-адреси користувача
function getUserIP() {
    $ip = $_SERVER['REMOTE_ADDR'];
    if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)) {
        $ip = array_pop(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']));
    }
    return $ip;
}

// Збереження даних в файл users.json
function saveUsersData($data) {
    $file = '../../users.json';
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

// Отримання кількості відправлених POST запитів за останню хвилину
function getRequestsCountLastMinute($usersData) {
    $count = 0;
    foreach ($usersData as $value) {
        if (time() - $value['timestamp'] <= 60) {
            $count++;
        }
    }
    return $count;
}

function getRequestsCountLastDay($usersData) {
    $count = 0;
    foreach ($usersData as $value) {
        if (time() - $value['timestamp'] <= 86400) {
            $count++;
        }
    }
    return $count;
}

function getRequestsCountByIp($ip, $usersData) {
    $count = 0;
    foreach ($usersData as $userData) {
        if ($userData['ip'] === $ip) {
            $count++;
        }
    }
    return $count;
}

function sendMail($messageBody, $email) {
    try {
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $secrets->mails[1];
        $mail->Password   = $secrets->password[1];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom($secrets->mails[1], 'Portfolio');
        $mail->addAddress(''. $email .'');

        $mail->isHTML(true);
        $mail->Subject = 'Повідомлення з портфоліо!';
        $mail->Body    = $messageBody;
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

if(isset($name, $email, $message)) {
    $userData = [
        "name" => $name,
        "email" => $email,
        "message" => $message,
        "ip" => getUserIP()
    ];

    $file = '../../users.json';
    $usersData = [];
    if (file_exists($file)) {
        $data = file_get_contents($file);
        $usersData = json_decode($data, true);
    }

    $portfolioMessageBody = '<h1>Хей, нове повідомлення з портфоліо!</h1>
    <h2>' . $userData['name'] . ' пише:</h2>
    <p>' . $userData['message'] . '</p>
    <p>Пошта для зв\'язку: ' . $userData['email'] . ', успіхів!😉</p>';

    $blockIpMailBody = '<h1>Схоже, повідомлення вже було відправлено!</h1>
    <p>'. $userData["name"] .', скоріше за все, я вже отримав ваше повідомлення.</p>
    <p>Якщо, виникла якась помилка, можете зв\'язатись зі мною зручним для вас способом:</p>
    <p><a href="mailto:qunthunnan@gmail.com">qunthunnan@gmail.com</a>, <a href="https://t.me/Qunthunnan0">Telegram</a>, <a href="https://www.facebook.com/kirylo.bashkan">Facebook</a></p>';

    $requestsLastDay = getRequestsCountLastDay($usersData);
    $warningMailBody = '<h1 style="color: red">!!УВАГА, НА СЕРВЕРІ СКОРІШЕ ЗА ВСЕ ВИЯВЛЕНО СПАМ!!</h1>
    <h2>Кількість відправлених повідомлень за останні 24 години:' . $requestsLastDay . '</h2>
    <h3>Рекомендую відключити поки mailer до з\'ясування обставин.</h3>';
    if($requestsLastDay == 30 || $requestsLastDay == 50 || $requestsLastDay == 70 || $requestsLastDay == 88) {
        echo 'Warning, spam possible!' . $requestsLastDay . ' was sended for last 24 hours';
        sendMail($warningMailBody, 'bredtv6@gmail.com');
    }

    if($requestsLastDay >= 90) {
        echo 'Error, spam detected!';
    } else {
        $requestsLastMinute = getRequestsCountLastMinute($usersData);
        if ($requestsLastMinute >= 1) {
            echo 'Error: Bandwidth limit reached, please try again later';
        } else {
            $requestsByIp = getRequestsCountByIp($userData["ip"], $usersData);
            if ($requestsByIp > 5) {
                echo 'Error: To many requests from your IP';
            } else {
                if($requestsByIp == 5) {
                    echo 'Block ip for security reasons.';
                    sendMail($blockIpMailBody, $userData['email']);
                    $usersData[] = [
                        'ip' => $userData["ip"],
                        'email' => $userData["email"],
                        'timestamp' => time(),
                        'timeDate' => date("d-m-Y H:i:s"),
                    ];
                    saveUsersData($usersData);
                } else {
                    sendMail($portfolioMessageBody, 'qunthunnan@gmail.com');
                    $usersData[] = [
                        'ip' => $userData["ip"],
                        'email' => $userData["email"],
                        'timestamp' => time(),
                        'timeDate' => date("d-m-Y H:i:s"),
                    ];
                    saveUsersData($usersData);
                }
            }
        }
    }
} else {
    echo 'Form data error!';
}
?>