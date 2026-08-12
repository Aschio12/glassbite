import urllib.request
import urllib.error

urls = [
    ("public/images/side_onion_rings.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/a6/Onion_rings.jpg"),
    ("public/images/side_mac_cheese.jpg", "https://upload.wikimedia.org/wikipedia/commons/1/14/Macaroni_and_cheese_%282%29.jpg")
]

req_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

for filename, url in urls:
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            print("Success")
    except urllib.error.URLError as e:
        print(f"Failed: {e}")
