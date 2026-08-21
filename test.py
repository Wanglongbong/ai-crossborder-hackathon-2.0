import os
import sys
import json
import time
import urllib.request
import urllib.error
from openai import OpenAI

# Đảm bảo in tiếng Việt chuẩn và không bị buffer trên Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", line_buffering=True)

# Cấu hình BytePlus ModelArk từ biến môi trường
API_KEY = os.environ.get("BYTEPLUS_ARK_API_KEY") or os.environ.get("ARK_API_KEY") or ""
BASE_URL = os.environ.get("BYTEPLUS_BASE_URL", "https://ark.ap-southeast.bytepluses.com/api/v3")

if not API_KEY:
    print("❌ Lỗi: Chưa tìm thấy API Key! Vui lòng set biến môi trường BYTEPLUS_ARK_API_KEY hoặc ARK_API_KEY.")
    sys.exit(1)

client = OpenAI(
    base_url=BASE_URL,
    api_key=API_KEY
)

def test_chat():
    print("\n" + "=" * 60)
    print("💬 1. KIỂM TRA CHAT / TEXT (Seed 2.1)")
    print("=" * 60)
    model_name = "dola-seed-2-1-turbo-260628"
    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "user", "content": "Xin chào BytePlus Seed 2.1!"}
            ],
            max_tokens=50
        )
        print(f"✅ Model '{model_name}' phản hồi thành công:")
        print(f"👉 {response.choices[0].message.content.strip()}")
    except Exception as e:
        print(f"❌ Lỗi: {e}")

def test_image_generation():
    print("\n" + "=" * 60)
    print("🎨 2. KIỂM TRA TẠO ẢNH (Seedream 5.0 Pro)")
    print("=" * 60)
    model_name = "dola-seedream-5-0-pro-260628"
    prompt = "A premium smart insulated water bottle on a clean minimalist studio backdrop, 8k resolution, photorealistic commercial product shot"
    
    print(f"--> Đang gửi yêu cầu tạo ảnh tới '{model_name}'...")
    try:
        response = client.images.generate(
            model=model_name,
            prompt=prompt,
            size="1024x1024",
            n=1
        )
        image_url = response.data[0].url
        print(f"✅ [TẠO ẢNH THÀNH CÔNG]!")
        print(f"🔗 Link ảnh kết quả: {image_url}")
        return image_url
    except Exception as e:
        print(f"❌ Lỗi tạo ảnh: {e}")
        return None

def test_video_generation():
    print("\n" + "=" * 60)
    print("🎬 3. KIỂM TRA TẠO VIDEO (Seedance 2.5)")
    print("=" * 60)
    model_name = "dreamina-seedance-2-5-260628"
    prompt = "A sleek modern smart water bottle standing on a wooden table, smooth 360 degree rotation, soft sunlight, cinematic 4k"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    payload = {
        "model": model_name,
        "content": [
            {
                "type": "text",
                "text": prompt
            }
        ]
    }
    
    print(f"--> Đang gửi yêu cầu tạo task video tới '{model_name}'...")
    try:
        req = urllib.request.Request(
            f"{BASE_URL}/contents/generations/tasks",
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            res_data = json.loads(resp.read().decode("utf-8"))
            task_id = res_data.get("id") or res_data.get("task_id")
            print(f"✅ [TẠO TASK VIDEO THÀNH CÔNG] - Task ID: {task_id}")
            
        # Kiểm tra trạng thái xử lý của Task
        print("⏳ Đang kiểm tra tiến độ video...")
        for i in range(1, 4):
            time.sleep(3)
            get_req = urllib.request.Request(
                f"{BASE_URL}/contents/generations/tasks/{task_id}",
                headers=headers,
                method="GET"
            )
            with urllib.request.urlopen(get_req, timeout=30) as check_resp:
                status_data = json.loads(check_resp.read().decode("utf-8"))
                status = status_data.get("status")
                print(f"   [Lần {i}] Trạng thái task: {status}")
                if status == "succeeded":
                    video_url = status_data.get("content", {}).get("video_url")
                    print(f"🎉 VIDEO ĐÃ HOÀN TẤT! Link: {video_url}")
                    return
                elif status == "failed":
                    print(f"❌ Video thất bại: {status_data.get('error')}")
                    return
        print(f"ℹ️ Task video đang được render trên GPU cluster của BytePlus (Task ID: {task_id}).")
    except Exception as e:
        print(f"❌ Lỗi tạo video: {e}")

if __name__ == "__main__":
    test_chat()
    test_image_generation()
    test_video_generation()
