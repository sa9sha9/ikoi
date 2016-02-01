ons.bootstrap(); //ここで全てのonsenUIのjsを呼び出す

$(document).on("pageinit", "#page1", function () {
  origin(); //始まり始まり
});

arrayTable = [];


/*-----------------
  報告modalの呼び出し
-----------------*/
//function open_modal_report() {
//    modal_report.show();
//}
//
//function close_modal_report() {
//    modal_report.hide();
//}
//
//function do_report() {
//    modal_report.hide();
//    $("#sample_report1").hide("slow", function () {
//        $("#sample_report2").show("slow");
//    });
//}


/*-----------------
-------modal-------
-----------------*/
/* 登録modalの呼び出し */
function open_modal_resister() {
  modal_resisite.show();
}

function close_modal_resister() {
  modal_resister.hide();
}


/* お気に入りmodalの呼び出し*/
function open_modal_favorite() {
  modal_favorite.show();
}

function close_modal_favorite() {
  modal_favorite.hide();
}

function do_favorite() {
  modal_favorite.hide();
  open_modal_complete();
}

/* 完了確認modalの呼び出し*/
function open_modal_complete() {
  modal_complete.show();
}

function close_modal_complete() {
  modal_complete.hide();
}



//====Google Map API=====//
var map; //mapオブジェクト
var currentInfoWindow; //マーカー詳細表示ウィンドウ

//Unified
function origin() {
  //現在位置取得成功 => 現在地プロット
  //現在位置取得失敗 => 会津若松市市役所
  //現在位置未対応 => 会津若松市市役所

  //現在の位置情報を取得
//  var myLatLng = getLocation();
  getLocation();

//  if (myLatLng == null) { // 位置情報取得に失敗した場合、会津若松市役所を中央にしてMAP表示
  var myLatLng = new google.maps.LatLng(37.49473, 139.92981);
//  }

  //オプションの設定
  var mapOptions = {
    center: myLatLng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //Mapオブジェクトの生成
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  //マーカー生成＆プロット
//  plotMarker(myLatLng);
  // サークルオプションの設定
  //  var circleOptions = {
  //    center: myLatLng,
  //    map: map,
  //    radius: 10000,
  //    strokeWeight: 3,
  //    strokeColor: "#cd5c5c",
  //    strokeOpacity: 0.5,
  //    fillColor: "#e9967a",
  //    fillOpacity: 0.5
  //  };

  // サークル表示（半径10k）
//  var circle = new google.maps.Circle(circleOptions);
//
//  // プレイス検索
//  var request = {
//    location: myLatLng,
//    radius: '10000',
//  };
//  infowindow = new google.maps.InfoWindow();
//  var service = new google.maps.places.PlacesService(map);
//  service.search(request, function (results, status) { //リクエスト&コールバック
//    if (status == google.maps.places.PlacesServiceStatus.OK) {
//      for (var i = 0; i < results.length; i++) {
//        var place = results[i];
//        createMarker(results[i]);
//      }
//    }
//  });


  //現在地情報の取得(初期位置)
  //  if (navigator.geolocation) {
  //    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  //  } else {
  //    console.log("現在位置が取得できませんでした");
  //    mapinitialize(37.49473, 139.92981);
  //  }
}

// プレイス検索のときに表示するマーカー
//function createMarker(place) {
//	var placeLoc = place.geometry.location;
//	var marker = new google.maps.Marker({
//		map: map,
//		position: place.geometry.location
//	});
//
//	google.maps.event.addListener(marker, 'click', function() {
//		infowindow.setContent(place.name);
//		infowindow.open(map, this);
//	});
//}



/*-----------------------
  現在位置表示のコールバック
------------------------*/
//function successCallback(position) {
//  //成功したときの処理
//  console.log("位置情報：成功");
//  var current_latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//  //  var current_lat = position.coords.latitude,
//  //      current_lng = position.coords.longitude;
//
//  //  console.log(current_lat);
//  //  console.log(current_lng);
//  console.log(current_latlng.lat());
//  console.log(current_latlng.lng());
//
//  //Map初期化と表示(中央は現在位置)
//  mapinitialize(current_latlng);
//
//  //マーカーplot
//  plotMarker(current_latlng);
//
//}
//
//function errorCallback(error) {
//  //失敗のときの処理 
//  console.log("位置情報：失敗")
//  var current_latlng = new google.maps.LatLng(37.49473, 139.92981);
//
//  //Map初期化と表示(中央は会津若松市市役所)
//  mapinitialize(current_latlng);
//
//  //マーカーplot
//  plotMarker(current_latlng);
//}

// 現在地取得
function getLocation() {
  console.log("enter getLocation");
  // 位置情報取得のオプション。高精度にする
  var position_options = {
    enableHightAccuracy: true
  };
  // 現在地取得（変わる毎に更新）
  navigator.geolocation.watchPosition(success, fatal, position_options);

  //位置情報取得成功時
  function success(position) {
    console.log("success");
    var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //センターを現在位置に
    map.setCenter(myLatLng);
    plotMarker(myLatLng);
  }

  // 位置情報取得失敗時
  function fatal(error) {
    console.log("error");
    var message = "";

    switch (error.code) {
      // 位置情報が取得出来ない場合
    case error.POSITION_UNAVAILABLE:
      message = "位置情報の取得ができませんでした。";
      break;
      // Geolocationの使用が許可されない場合
    case error.PERMISSION_DENIED:
      message = "位置情報取得の使用許可がされませんでした。";
      break;
      // タイムアウトした場合
    case error.PERMISSION_DENIED_TIMEOUT:
      message = "位置情報取得中にタイムアウトしました。";
      break;
    }
    console.log(message);
  }
}


function plotMarker(myLatLng){
  //@@
  console.log(myLatLng);

  // ユーザのマーカーアイコンを変更
  var markerImage = new google.maps.MarkerImage(
    // 画像の場所
    "http://blog-imgs-44.fc2.com/p/c/r/pcrice/mark2.png",
    // マーカーのサイズ
    new google.maps.Size(20, 24),
    // 画像の基準位置
    new google.maps.Point(0, 0),
    // Anchorポイント
    new google.maps.Point(10, 24)
  );

  // 現在地のマーカー表示
  var marker = new google.maps.Marker({
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: myLatLng,
    title: "現在地",
    icon: markerImage
  });
  
}

/*-----------------
  mapinitialize関数
  dataset関数から呼び出し
  会津若松市の地図を表示する
-----------------*/
function mapinitialize(latitude, longitude) {
  //オプションの設定
  var mapOption = {
    //中心設定
    center: new google.maps.LatLng(latitude, longitude),
    //地図の種類
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    //地図の縮尺
    zoom: 15
  };

  //Mapクラスの作成と地図の描画
  var canvas = document.getElementById('map_canvas');
  mapMaster = new google.maps.Map(canvas, mapOption);

  //憩いスポットのプロット
  plotpoint();

  //現在位置のプロット ここでいいのか？
  //  plotself();
  //マーカーplot
  //  plotMarker(latitude, longitude);

}


/*-----------------
  plotpoint関数
-----------------*/
function plotpoint() {
  place_search(); //base.js
}

function plotpoint2() {
  //[緯度,経度]、名前、憩い度、来訪者、設備数、特徴数、コメント、URL
  //
  //            {"latlng":"37.49373,139.91981", "name":"スーパー川崎の休憩所", "star":4, "people":40, "equipment":[3, 4, 5], "feature":[1, 2, 3], "comment":"cm", "url":"url"},
  //            {"latlng":"37.50173,139.92481", "name":"松島公園", "star":4, "people":59, "equipment":[1, 4], "feature":[1, 3], "comment":"cm", "url":"url"},
  //            {"latlng":"37.48273,139.93181", "name":"金次郎像前休憩スペース", "star":1, "people":9, "equipment":[2, 4], "feature":[2, 4, 3], "comment":"cm", "url":"url"},
  //            {"latlng":"37.49973,139.93981", "name":"会津大学食堂", "star":2, "people":12, "equipment":[1, 3], "feature":[1, 2], "comment":"cm", "url":"url"},
  //            {"latlng":"37.49723,139.93081", "name":"３つの土管がある空き地", "star":3, "people":31, "equipment":[1, 4], "feature":[3, 5], "comment":"cm","url": "url"},
  //        ];

  var limit = 6;
  var content = "";
  var status;

  for (var i = 0; i < limit; i++) {
    //        var latlng = arrayTable[i]['latlng'].split(',');
    var myLatlng = new google.maps.LatLng(arrayTable[i].latlng.latitude, arrayTable[i].latlng.longitude);
    if (arrayTable[i].people > 20) { //来訪者が30人以上のとき
      //名前
      content = '<h4>' + arrayTable[i].name + '</h4>';
      //星(憩い度)
      content += '<p>憩い度：';
      for (var j = arrayTable[i].star; j > 0; j--) {
        content += '<img width="32" height="32" src="./images/star.png">';
      }
      content += '<br/>';
      //訪問者数
      content += '訪問者数：' + arrayTable[i].people + '人<br/>'
        //設備
      content += '設備：';
      var arr = arrayTable[i].equipment;
      for (j = 0; j < arr.length; j++) {
        content += switchEquipment(arr[j]);
      }
      content += '<br/>'
        //特徴
      content += '特徴：'
      arr = arrayTable[i].feature;
      for (j = 0; j < arr.length; j++) {
        content += switchFeature(arr[j]);
      }
      content += '<br/>';
      content += 'Comment：<br/> 閑静な場所で、落ち着きがあります。 <br/></p>';
      content += '<img width="32" height="32" src="./images/check.png" onclick="open_modal_favorite()" />';
      status = 1;
    } else { //30人未満のとき
      content = '<h4>' + arrayTable[i].name + '</h4>';
      //星(憩い度)
      content += '<p>憩い度：';
      for (var j = arrayTable[i].star; j > 0; j--) {
        content += '<img width="32" height="32" src="./images/star.png">';
      }
      content += '<br/>';
      content += '訪問者数：' + arrayTable[i].people + '人<br/>'
        //設備
      content += '設備：';
      arr = arrayTable[i].equipment;
      for (j = 0; j < arr.length; j++) {
        content += switchEquipment(arr[j]);
      }
      content += '<br/>';
      //特徴
      content += '特徴：';
      arr = arrayTable[i].feature;
      for (j = 0; j < arr.length; j++) {
        content += switchFeature(arr[j]);
      }
      content += '<br/>';
      content += 'Comment：<br/> ~~~~~~ <br/></p>';
      content += '<img width="32" height="32" src="./images/check.png" onclick="open_modal_favorite()" />';
      status = 0;
    }
    createMarker(myLatlng, content, mapMaster, status);
  }
}

/*該当する設備を格納*/
function switchEquipment(key) {
  switch (key) {
  case 0:
    return '';
    break;
  case 1:
    return '<img width="32" height="32" src="./images/hamburger.png">';
    break;
  case 2:
    return '<img width="32" height="32" src="./images/drink.png">';
    break;
  case 3:
    return '<img width="32" height="32" src="./images/sleep.png">';
    break;
  case 4:
    return '<img width="32" height="32" src="./images/book.png">';
    break;
  case 5:
    return '<img width="32" height="32" src="./images/pencil.png">';
    break;
  }
}

/*該当する特徴を格納*/
function switchFeature(key) {
  switch (key) {
  case 0:
    return '';
    break;
  case 1:
    return '[静]';
    break;
  case 2:
    return '[広]';
    break;
  case 3:
    return '[洒]';
    break;
  case 4:
    return '[落]';
    break;
  case 5:
    return '[楽]';
    break;
  }
}

/*マーカーを描画*/
function createMarker(latlng, content, map, status) {

  var icon_img = "";
  var icon_animation = "";
  var marker = ""

  switch (status) {
  case 0:
    icon_img = "./images/m_64.png";
    marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: icon_img
    });
    break;
  case 1:
    icon_img = "./images/m_64.png";
    marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: icon_img,
      animation: google.maps.Animation.BOUNCE //バウンド
    });
    break;
  }


  /* ポップアップウィンドウ*/
  var infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function () {
    //先に開いた情報ウィンドウがあれば、closeする
    if (currentInfoWindow) {
      currentInfoWindow.close();
    }
    //情報ウィンドウを開く
    infoWindow.setContent(content);
    infoWindow.open(map, marker);
    //開いた情報ウィンドウを記録しておく
    currentInfoWindow = infoWindow;
  });
}


////=====ユーザ情報========
function plotself() {
  navigator.geolocation.watchPosition(function (position) {
    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    plotMarker(myLatlng);
  });
}

//function plotMarker(latlng) {
//  console.log("plotMarker");
//
//  var marker = new google.maps.Marker({
//    position: latlng,
//    map: mapMaster,
//    icon: "./images/nowgeo.png"
//  });
//
//  var infoWindow = new google.maps.InfoWindow();
//
//  //クリックされた時の処理
//  google.maps.event.addListener(marker, 'click', function () {
//    //先に開いた情報ウィンドウがあれば、closeする
//    if (currentInfoWindow) {
//      currentInfoWindow.close();
//    }
//    //情報ウィンドウを開く
//    infoWindow.setContent('<h4>現在位置</h4>');
//    infoWindow.open(mapMaster, marker);
//    //開いた情報ウィンドウを記録しておく
//    currentInfoWindow = infoWindow;
//  });
//}