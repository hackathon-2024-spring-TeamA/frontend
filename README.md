# Frontend (React \* Vite)

## 前提

- nodeをインストールしていること
  - ターミナルで`node --version`を実行。（バージョンが表示されればOK）

## バージョン管理

【node --version -> v21.7.1】
`asdf`で管理していますが、`volta`, `nvm`, `nodenv`好きなのを使用してください。
pythonなど、他のバージョンも一括で管理したい場合は`asdf`。
nodeに特化したバージョン管理が良ければ`volta`がお勧め。

【パッケージ管理 -> pnpm】

パッケージ管理は`pnpm`を使用しています

## ディレクトリ構成

```ディレクトリ構成
src/
├── assets          # 静的リソース（画像、フォント等）の管理
├── components      # 再利用可能なUIコンポーネント
├── configs         # アプリケーションの設定ファイル
├── features        # 特定の機能ごとのコンポーネントやロジック
├── hooks           # カスタムReactフック
├── pages           # 各ページに対応するコンポーネント
├── routes          # ルーティング設定
├── stores          # 状態管理（ReduxやZustand等）
├── stories         # Storybookで使用するコンポーネントのストーリー
└── types           # TypeScriptの型定義ファイル

```
# front
