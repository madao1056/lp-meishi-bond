import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, materials } = req.body;

  // メール送信設定（Gmail例）
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // アプリパスワード
    }
  });

  // 資料のURLマッピング
  const materialLinks = {
    'branding': 'https://drive.google.com/file/d/xxx/view',
    'web': 'https://drive.google.com/file/d/yyy/view',
    'sns': 'https://drive.google.com/file/d/zzz/view',
    'automation': 'https://drive.google.com/file/d/aaa/view'
  };

  // 選択された資料のリンクを生成
  const selectedMaterials = materials
    .filter(m => materialLinks[m])
    .map(m => `・${m}: ${materialLinks[m]}`)
    .join('\n');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '【合同会社ぼんど】資料のご送付',
    text: `
${name} 様

この度は資料請求いただきありがとうございます。
ご請求いただいた資料のダウンロードリンクをお送りいたします。

■ ダウンロードリンク
${selectedMaterials}

※リンクの有効期限は7日間です。

ご不明な点がございましたら、お気軽にお問い合わせください。

---
合同会社ぼんど
橋口 真幸
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    
    // 管理者にも通知
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '【通知】資料請求がありました',
      text: `
名前: ${name}
メール: ${email}
請求資料: ${materials.join(', ')}
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}