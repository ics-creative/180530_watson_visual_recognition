const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const fs = require('fs');

// 資格情報を設定しVisualRecognitionオブジェクトを作成
const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  "iam_apikey": "(APIキーを入力)",
  "url": "https://gateway.watsonplatform.net/visual-recognition/api",
});

// 画像認識を行う対象の画像を読み込む
const images_file = fs.createReadStream(__dirname + '/images/chusions.jpg');

// 画像認識APIへ付与するパラメータを準備
const params = {
  images_file: images_file, // 画像認識を行う対象画像を指定
  accept_language: 'ja', // 認識結果を日本語で出力
  classifier_ids: ["cushion_1502909105"], // カスタム分類器のIDを指定
};

visualRecognition.classify(params, (err, response) => {
  if (err) {
    console.log(err);
    return;
  }
  // 返却されたJSONデータを出力
  console.log(JSON.stringify(response, null, 2));
});
