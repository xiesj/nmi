424["user_msg", {
	"bot_key": "0534f362666246b9",
	"message": {
		"type": "text",
		"text": "sss"
	},
	"user_id": "f0348323-5ba6-4b40-b0b5-e92300014a7c",
	"ack": 5,
	"key": "3210127.0.0.13210"
}]

423["user_msg", {
	"bot_key": "0534f362666246b9",
	"message": {
		"postback": "node_00B35C749F__DFF8557B12F14D97B33C508B580776B0||data_disease=武漢肺炎",
		"type": "postback",
		"text": "武漢肺炎"
	},
	"user_id": "f0348323-5ba6-4b40-b0b5-e92300014a7c",
	"ack": 4,
	"key": "3210127.0.0.13210"
}]

426["user_msg", {
	"bot_key": "0534f362666246b9",
	"message": {
		"postback": "node_00B35C749F__DFF8557B12F14D97B33C508B580776B0||data_disease=糖尿病",
		"type": "postback",
		"text": "糖尿病"
	},
	"user_id": "f0348323-5ba6-4b40-b0b5-e92300014a7c",
	"ack": 7,
	"key": "3210127.0.0.13210"
}]

EngtChat.sendMessage({
		"postback": "node_00B35C749F__DFF8557B12F14D97B33C508B580776B0||data_disease=糖尿病",
		"type": "postback",
		"text": "糖尿病"
	}, 'postback')


<script>
	! function(e, t, a) {
		var c = e.head || e.getElementsByTagName("head")[0],
			n = e.createElement("script");
		n.async = !0, n.defer = !0, n.type = "text/javascript", n.src = t + "/static/js/chat_widget.js?config=" + JSON.stringify(
			a), c.appendChild(n)
	}(document, "https://app.engati.com", {
		bot_key: "0534f362666246b9",
		welcome_msg: true,
		branding_key: "default",
		server: "https://app.engati.com",
		e: "p"
	});
</script>
