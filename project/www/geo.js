//位置情報取得に成功した場合のコールバック
var onSuccess = function (position) {
    var current = new CurrentPoint();
    current.distance = CurrentPoint.distance; //検索範囲の半径を保持する    
    current.geopoint = position.coords; //位置情報を保存する
    search(current);
};

//位置情報取得に失敗した場合のコールバック
var onError = function (error) {
    console.log("現在位置を取得できませんでした");
};

//位置情報取得時に設定するオプション
var option = {
    timeout: 6000 //タイムアウト値(ミリ秒)
};

//現在地を取得する
function find() {
    CurrentPoint.distance = 5; //検索距離を5kmに設定
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}

//現在地を"保持する"クラスを作成
function CurrentPoint() {
    geopoint = null; //端末の位置情報を保持する
    distance = 0; //位置情報検索に利用するための検索距離を指定する
}

//mobile backendから位置情報を検索するメソッド
function search(current) {
    //位置情報を検索するクラスのNCMB.Objectを作成する
    var place = NCMB.Object.extend("place");

    //NCMB.Queryを作成
    var query = new NCMB.Query(place);
    //位置情報をもとに検索する条件を設定
    var geoPoint = new NCMB.GeoPoint(current.geopoint.latitude, current.geopoint.longitude);
    query.withinKilometers("latlng", geoPoint, current.distance); //current.distance以内のlatlngのもの

    //mobile backend上のデータ検索を実行する
    query.find({
            success: function (points) {
                    // 検索が成功した場合の処理
                    //Google mapの設定
                    var mapOptions = {
                        //中心地設定
                        center: new google.maps.LatLng(current.geopoint.latitude, current.geopoint.longitude),
                        //地図のタイプを指定
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                            //ズーム設定
                        zoom: 15,
                    };
                
                //マップ描画
                mapinitialize(mapOpinions);
                //マーカー表示
                createMarker(latlng,content,map,status);
                }
                ///////////////// ここまで変更部分 ////////////////////
        },
        error: function (error) {
            // 検索に失敗した場合の処理
            console.log(error.message);
        });
}

//====Google Map API=====//
var mapMaster;
var currentInfoWindow;
//var marker;

function dataset() {

    //拠点ポイント打つ
    plotpoint();

    plotself();
}

/*-----------------
  mapinitialize関数
  dataset関数から呼び出し
  会津若松市の地図を表示する
-----------------*/
function mapinitialize(mapOpinion) {

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


/*=======================
/====スポットを登録する====
=======================*/
function saveSpot() {
    //位置情報が取得できたときの処理
    var onSuccess = function (location) {

        //記事内容を取得
        var name = $("#name").val();

        //位置情報オブジェクトを作成(位置情報取得)
        var latlng = new NCMB.GeoPoint(location.coords.latitude, location.coords.longitude);

        //placeクラスのインスタンスを作成★
        var PlaceClass = NCMB.Object.extend("place");
        var place = new PlaceClass();

        //値を設定★
        place.set("name", name);
        place.set("latlng", latlng);

        //保存を実行★
        place.save();

        //前のページに戻る
        close_modal_resister();
    }

    //位置情報取得に失敗した場合の処理
    var onError = function (error) {
        console.log("error:" + error.message);
    }

    var option = {
        timeout: 6000 //タイムアウト値(ミリ秒)
    };

    //位置情報を取得
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}