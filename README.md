# 名刺専用LPページ - 合同会社ぼんど

## 概要
名刺のQRコードから遷移する専用のランディングページです。
初対面の経営者に「何を頼める人か」「どんな強みがあるか」を端的に伝え、資料ダウンロードと相談フォーム送信をゴールとします。

## ページURL
- **本番**: `/meishi/` (例: https://your-domain.vercel.app/meishi/)
- **ローカル**: http://localhost:4321/meishi/

## セットアップ

### 必要なもの
- Node.js 18以上
- npm

### インストール
```bash
npm install
```

### 開発サーバー起動
```bash
npm run dev
```
ブラウザで http://localhost:4321/meishi/ にアクセス

### ビルド
```bash
npm run build
```

## Vercelへのデプロイ

### 方法1: Vercel CLIを使用
```bash
# Vercel CLIをインストール（まだの場合）
npm i -g vercel

# デプロイ
vercel
```

### 方法2: GitHub連携（推奨）
1. このプロジェクトをGitHubにプッシュ
2. [Vercel](https://vercel.com)にログイン
3. 「New Project」をクリック
4. GitHubリポジトリをインポート
5. そのままデプロイ（設定は自動検出されます）

## カスタマイズが必要な箇所

### 画像ファイル
`public/images/gussan-profile.jpg` にプロフィール写真を配置してください。

### フォーム送信先
`src/pages/meishi/index.astro` 内のフォーム部分:
- `<form>` タグの `action` 属性にFormspreeなどのエンドポイントを設定
- `method="POST"` を追加

例:
```html
<form class="form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### メタタグ
現在 `noindex,nofollow` が設定されています。一般公開する場合は削除してください。

## ディレクトリ構造
```
/
├── src/
│   └── pages/
│       ├── index.astro      # デフォルトページ
│       └── meishi/
│           └── index.astro   # 名刺専用LP
├── public/
│   └── images/              # 画像ファイル用
├── dist/                    # ビルド出力（git管理外）
└── vercel.json             # Vercel設定
```

## カラーパレット
- ベース背景: #FAFAF9
- メイン黄色: #FAD707
- セカンダリー黄色: #D0A51D
- 文章色（ダークネイビー）: #1F2E6C
- アクセントブラウン: #734A27