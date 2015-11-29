//window.APP_KEY = "23e828f381fab4499ca231237f746ce3737e67040663d54aabcbd9188cb004e5";
//window.CLIENT_KEY = "aa6cf5d76a0f30a0d33795c04146cab29b33f8e75cbf37f339d654f1b60a7451";
    apikey = "adc687194406b5eb94f0f36c3bd684e41b72e1d0e9b913e3a76178e502513d2c";
    clientkey = "37aa57400c1add3e79e4b943dddaf484a16c53330f0c11472d8cb6a0ba67d410";


$(function(){
    //起動時にmobile backend APIキーを設定
    NCMB.initialize(apikey,clientkey);
})


//起動時にmobile backend APIキーを設定
var ncmb = new NCMB(apikey, clientkey);


//mobile backendから位置情報を検索するメソッド
function search(current){
    //var current.geopoint = new NCMB.GeoPoint(35.707438,139.774632);
    //位置情報を検索するクラスのNCMB.Objectを作成する
    var PlaceClass = NCMB.Object.extend("place");

    //NCMB.Queryを作成
    var query = new NCMB.Query(PlaceClass);
    //位置情報をもとに検索する条件を設定
    //var geoPoint = new NCMB.GeoPoint(current.geopoint.latitude,current.geopoint.longitude);
    //var geoPoint = new NCMB.GeoPoint(current.geopoint.latitude,current.geopoint.longitude);
    //var geoPoint = new NCMB.GeoPoint('35.70743','139.774632');
    var geoPoint = new NCMB.GeoPoint(35.70743,139.774632);
    query.withinKilometers("latlng", geoPoint, 5);

    //mobile backend上のデータ検索を実行する
    query.find({
        success: function(points) {
            $("#result").html("");
            // 検索が成功した場合の処理
            for (var i = 0; i < points.length; i++){
                var point = points[i];
                $("#result").append("<p>スポット名：" + point.get("name") + "</p>");
            }
        },
        error: function(error) {
            // 検索に失敗した場合の処理
            console.log(error.message);
        }
    });
}

//
//
//function place_search() { //サーチ内容をハッシュの形で渡す
//    //プレイヤーがTaroのスコアを降順で取得
//    var array = [];
//    var place = ncmb.DataStore("place");
//    place.greaterThan("people", 20) //訪問者が20人以上のとき
//        //位置情報をもとに検索する条件を設定
//        //var geoPoint = new ncmb.GeoPoint(37.000000,138.0000000);
//        //place.withinKilometers("latlng", geoPoint, 5);
//        .fetchAll()
//        .then(function (results) {
//        for(i=0;i<results.length;i++){
//            console.log(results[i]); //取得した結果を表示
//            array[i] = results[i];
//        }
//        })
//        .catch(function (err) {
//            console.log(err);
//        });
//    console.log(array);
//    return array;
//    }


// This is a JavaScript file
$('.btn').on('submit', function(e){
    console.log('hoge');
    var current = new CurrentPoint();
    current.geopoint.latitude  = 37.50484175;
    current.geopoint.longitude = 139.9230243;
    current.distance = 5;
    search(current);
});
$('.btn').on('click', function(e){
    console.log('hoge');
    search();
});

//位置情報取得に成功した場合のコールバック
var onSuccess = function(position){
    var current = new CurrentPoint();
    current.distance = CurrentPoint.distance;   //検索範囲の半径を保持する    
    current.geopoint = position.coords;         //位置情報を保存する
    search(current);
};

//位置情報取得に失敗した場合のコールバック
var onError = function(error){
    console.log("現在位置を取得できませんでした");
};

//位置情報取得時に設定するオプション
var option = {
    timeout: 6000   //タイムアウト値(ミリ秒)
};

//現在地を取得する
function find(){
    CurrentPoint.distance = 5; //検索距離を5kmに設定
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}

//現在地を保持するクラスを作成
function CurrentPoint(){
    geopoint=null;  //端末の位置情報を保持する
    distance=0;     //位置情報検索に利用するための検索距離を指定する
}

//mobile backendから位置情報を検索するメソッド
function search(current){
    //var current.geopoint = new NCMB.GeoPoint(35.707438,139.774632);
    //位置情報を検索するクラスのNCMB.Objectを作成する
    var SasukeneClass = NCMB.Object.extend("sasukene");

    //NCMB.Queryを作成
    var query = new NCMB.Query(SasukeneClass);
    //位置情報をもとに検索する条件を設定
    //var geoPoint = new NCMB.GeoPoint(current.geopoint.latitude,current.geopoint.longitude);
    //var geoPoint = new NCMB.GeoPoint(current.geopoint.latitude,current.geopoint.longitude);
    //var geoPoint = new NCMB.GeoPoint('35.70743','139.774632');
    var geoPoint = new NCMB.GeoPoint(35.70743,139.774632);
    query.withinKilometers("geo", geoPoint, 5);

    //mobile backend上のデータ検索を実行する
    query.find({
        success: function(points) {
            $("#result").html("");
            // 検索が成功した場合の処理
            for (var i = 0; i < points.length; i++){
                var point = points[i];
                $("#result").append("<p>スポット名：" + point.get("name") + "</p>");
            }
        },
        error: function(error) {
            // 検索に失敗した場合の処理
            console.log(error.message);
        }
    });
}

//スポットを登録する
function saveSpot(){
    //位置情報が取得できたときの処理
    var onSuccess = function (location){
        
        //記事内容を取得
        var title = $("#name").val();
        
        //位置情報オブジェクトを作成
        var geoPoint = new NCMB.GeoPoint(location.coords.latitude, location.coords.longitude);
        
        //Spotクラスのインスタンスを作成★
        
        //値を設定★
        
        //保存を実行★
        
        //前のページに戻る
        myNavigator.popPage();
    }
    
    //位置情報取得に失敗した場合の処理
    var onError = function(error){
        console.log("error:" + error.message);
    }
    
    var option = {
        timeout: 6000   //タイムアウト値(ミリ秒)
    };
    
    //位置情報を取得
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}
