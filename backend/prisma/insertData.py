from supabase import create_client, Client
import json, csv

# ----------------------------------------------------------------
# Supabaseの接続情報（git操作の際は隠す）
# ----------------------------------------------------------------
url: str = "SUPABASE_URL" # Project Settings > API > URL
key: str = "SUPABASE_ANON_KEY" # Project Settings > API > Project API keys

supabase: Client = create_client(url, key)

for table_name in ["questions", "ranking", "ranking_kf73"]:
    data = []

    # CSVファイルを開いて、データを読み込む
    with open(f"{table_name}.csv", "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        # ヘッダーを読み飛ばす
        next(reader)
        # データを読み込む
        for row in reader:
            data.append(row)
    
    # insertの方は試すの大変そうだから、ここから下は雰囲気でコードを書きました。動かないかもなので適宜修正してください
    # 普通にPythonじゃなくてもできると思います（学習コストかかりそうですが…）
    # print(data)    
    # Supabaseにデータを挿入
    for row in data:
        row2 = {"record_id": int(row[0]), "problem": int(row[1]), "username": row[2], "score": int(row[3])}
        try:
            supabase.table(table_name).insert(row2).execute()
        except Exception as e:
            print(e)
            print(row2)

            
