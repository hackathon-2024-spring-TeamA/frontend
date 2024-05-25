import React from "react";

const AboutPage: React.FC = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  };

  const boxStyle = {
    padding: "20px",
    border: "2px solid #333",
    borderRadius: "10px",
    backgroundColor: "white",
  };

  const boldTextStyle = {
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1>サービス概要</h1>
        <div>
          <h3>
            TECH-Libraは、技術書の相互貸借を可能にするプラットフォームです。このアプリを通じて、以下の課題を解決します。
          </h3>
          <ol>
            <li>
              <span style={boldTextStyle}>
                技術書を読みたいが購入できないユーザーへの支援
              </span>
              <br />
              ユーザー同士で技術書を無料で貸し借りできます。希望の書籍があれば、貸出可能なユーザーから借りることができます。
            </li>
            <li>
              <span style={boldTextStyle}>不要になった技術書の有効活用</span>
              <br />
              読み終わった技術書の置き場所に困っているユーザーは、アプリ上であの寄付を行うことで他のユーザーに提供できます。
            </li>
            <li>
              <span style={boldTextStyle}>RareTECHコミュニティへの貢献</span>
              <br />
              不要な技術書を提供することで、コミュニティ内での知識共有と助け合いに貢献できます。
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
