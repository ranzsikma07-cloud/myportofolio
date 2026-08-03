<?php

// 1. Masukkan URL Webhook dari Discord Anda di sini
$webhook_url = "https://discord.com/api/webhooks/1533839726921121842/4eLNuY4zG3UzjKwiNZ9ILsCfO02dggFGmNsqiCuYB_qVsQoCp7Q3jMLv1iQ0d2spC4St";

// 2. Pesan teks yg ingin dikirim ke discord
$data = [
    "username" => "Sistem Website",
    "embeds" => [
        [
            "title"       => "🛒 Pesanan Baru Masuk!",
            "description" => "Detail transaksi terbaru dari pelanggan:",
            "color"       => hexdec("3498db"), // Warna garis biru (Format HEX)
            "fields"      => [
                [
                    "name"   => "Nama Pelanggan",
                    "value"  => "Budi Santoso",
                    "inline" => true
                ],
                [
                    "name"   => "Total Pembayaran",
                    "value"  => "Rp 150.000",
                    "inline" => true
                ]
            ],
            "footer" => [
                "text" => "Waktu: " . date("Y-m-d H:i:s")
            ]
        ]
    ]
];

// 3. Ubah array data ke format JSON
$json_data = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

// 4. Inisialisasi cURL
$ch = curl_init($webhook_url);

// 5. Atur opsi cURL
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $json_data,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => true
]);

// 6. Eksekusi request
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// 7. Cek error
if (curl_errno($ch)) {
    echo 'Error cURL: ' . curl_error($ch);
} else {
    // Discord akan mengembalikan status 204 No Content jika pesan berhasil dikirim
    if ($http_code === 204 || $http_code === 200) {
        echo "Pesan berhasil dikirim ke Discord!";
    } else {
        echo "Gagal mengirim pesan. Kode HTTP: " . $http_code . " | Respon: " . $response;
    }
}

// 8. Tutup cURL
curl_close($ch);
?>