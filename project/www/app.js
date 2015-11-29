ons.bootstrap(); //ここで全てのonsenUIのjsを呼び出す

$(document).on("pageinit", "#page1", function () {
    dataset();
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
var mapMaster;
var currentInfoWindow;
//var marker;

function dataset() {

    //マップ初期化
    mapinitialize();

    //拠点ポイント打つ
    plotpoint();

    plotself();
}

/*-----------------
  mapinitialize関数
  dataset関数から呼び出し
  会津若松市の地図を表示する
-----------------*/
function mapinitialize() {

    var mapOption = {
        //中心設定
        center: new google.maps.LatLng(37.49473, 139.92981),
        //地図の種類
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //地図の縮尺
        zoom: 15
    };

    //Mapクラスの作成と地図の描画
    var canvas = document.getElementById('map_canvas');
    mapMaster = new google.maps.Map(canvas, mapOption);
}

/*-----------------
  plotpoint関数
-----------------*/
function plotpoint() {
    place_search();
}

function plotpoint2(){
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
//function plotself() {
//    navigator.geolocation.watchPosition(
//        function (position) {
//
//            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//            var marker = new google.maps.Marker({
//                position: myLatlng,
//                map: mapMaster,
//                icon: "./images/user.png"
//            });
//            var infoWindow = new google.maps.InfoWindow();
//
//            google.maps.event.addListener(marker, 'click', function () {
//
//                //先に開いた情報ウィンドウがあれば、closeする
//                if (currentInfoWindow) {
//                    currentInfoWindow.close();
//                }
//
//                //情報ウィンドウを開く
//                infoWindow.setContent('<h4>さくらい♡</h4>');
//                infoWindow.open(mapMaster, marker);
//
//                //開いた情報ウィンドウを記録しておく
//                currentInfoWindow = infoWindow;
//
//            });
//
//        }
//    );
//}

