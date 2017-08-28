import requests


url="https://wiki.yandex-team.ru/_api/frontend/mobiletesting/mobileapplication/mobilebrowser/ibro/in/CurrentRegression/.grid"

cookie = {'Session_id': '3:1503560927.5.0.1503560927994:ZgABAAAAAAAD0BCwuAYCKg:88.1|1120000000041030.0.2|110741.543630.86G5PfVsOaLqPw-pY4hLc88iirE'}

r_get = requests.get(url, cookies=cookie)


url_server = "http://192.168.1.100:8888/upload"

r_post = requests.post(url_server, r_get)
