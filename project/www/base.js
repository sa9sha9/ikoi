
//window.APP_KEY = "23e828f381fab4499ca231237f746ce3737e67040663d54aabcbd9188cb004e5";
//window.CLIENT_KEY = "aa6cf5d76a0f30a0d33795c04146cab29b33f8e75cbf37f339d654f1b60a7451";
apikey = "adc687194406b5eb94f0f36c3bd684e41b72e1d0e9b913e3a76178e502513d2c";
clientkey = "37aa57400c1add3e79e4b943dddaf484a16c53330f0c11472d8cb6a0ba67d410";

$(function(){
    //起動時にmobile backend APIキーを設定
    NCMB.initialize(apikey,clientkey);
});


function place_search() { 
    /*クエリの作成*/
    var place = NCMB.Object.extend("place");
    //NCMB.Queryを作成
    var query = new NCMB.Query(place);
    geoPoint = new NCMB.GeoPoint(37.49473, 139.92981);
    query.withinKilometers("latlng", geoPoint, 10); //current.distance以内のlatlngのもの
        //位置情報をもとに検索する条件を設定
        //var geoPoint = new ncmb.GeoPoint(37.000000,138.0000000);
        //place.withinKilometers("latlng", geoPoint, 5);
    query.find({
        success: function (results) { //成功した場合の処理
            for (i = 0; i < results.length; i++) {
                var result = results[i];
                //ハッシュを一つずつ格納していく
                arrayTable.push({
                    latlng: result.get("latlng"),
                    name: result.get("name"),
                    star: result.get("star"),
                    people: result.get("people"),
                    equipment: result.get("equipment"),
                    feature: result.get("feature"),
                    comment: result.get("comment"),
                    url: result.get("url"),
                });
            }
//            console.log('array_stringify:');
//            console.log(arrayTable);
            console.log(arrayTable[0].latlng.latitude);
            console.log(arrayTable.length);
            plotpoint2();
            
        },
        error: function (error) { //失敗した場合の処理
            console.log(error.message);
        }
    });
}
