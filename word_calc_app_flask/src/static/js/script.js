// = を押す前はanswerの枠組みを非表示にしておく
window.onload = function(){
    document.getElementById('answer').style.display = "none";
}

// イコールをクリックしたときの関数
function Equal(calc_num){
    var all_word = document.getElementById('all_word');
    var input_word = document.getElementById('input_box').value;
    document.getElementById('answer').style.display = "none";
    document.getElementById('result_wait').style.display = "block";
    document.getElementById('result_wait').innerHTML = "計算中...";

    if(calc_num == 1){
	all_word.innerHTML = input_word + " = ";
	var fData = new FormData();
	var data = all_word.innerHTML;
	fData.append('sentence', data);
	// 過去の結果の削除
	document.getElementById('answer').innerHTML = "";
	// all_wordを単語のみdivで囲む
	all_word.innerHTML = "";
	input_word = input_word.split(" ");
	for(var i = 0; i < input_word.length; i ++){
	    if(i % 2 == 0){
		all_word.innerHTML += "<span id = 'all_word_input'>" + input_word[i] + "</span>";
	    }else{
	        all_word.innerHTML += "<span id = 'all_word_ope_input'>" + input_word[i] + "</span>";
	    }
	}

	// ここでAjaxを使ったPOSTリクエストを送る
	$.ajax({
	    type: 'POST',
	    url: '/data',
	    data: fData,
	    contentType: false,
	    processData: false,
	    success: function(data, dataType){
	        // 通信成功 [200 OK時]
	    	console.log('Success');
	        var result = JSON.parse(data.ResultSet);
	        console.log(result)

	        // answer枠組みを表示
	        document.getElementById('answer').style.display = "block";

	        for(var i = 0; i < result.length; i ++){
	            document.getElementById('answer').innerHTML +=
	            "<div>" +
		        "<span class = 'col-1'>" + result[i][0] + "</span>" +
		        "<span class = 'col-2'>" + "(" + result[i][1] + ")" + "</span>" +
	            "</div>";
	        }

	        document.getElementById('result_wait').innerHTML = "";
	        document.getElementById('result_wait').style.display = "none";
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown){
	        // 通信失敗
	        console.log('Error');
            }
        });
    }
}

// 入力時にEnterキーでEqual関数を呼び出す
function toEnter(){
    if(window.event.keyCode==13){
	Equal(1);
    }
}
