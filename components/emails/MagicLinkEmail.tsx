import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type Props = { url: string };

export function MagicLinkEmail({ url }: Props) {
  return (
    <Html lang="ja">
      <Head />
      <Preview>RateGen — サインインリンク</Preview>
      <Body style={{ backgroundColor: '#f9f7f4', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', border: '1px solid #e2ddd7' }}>
          <Heading style={{ color: '#1e3a5f', fontSize: '20px', marginBottom: '8px' }}>
            RateGen へサインイン
          </Heading>
          <Text style={{ color: '#3d3830', fontSize: '15px', lineHeight: '1.6' }}>
            以下のボタンをクリックしてサインインしてください。リンクは15分間有効です。
          </Text>
          <Section style={{ textAlign: 'center', margin: '32px 0' }}>
            <Button
              href={url}
              style={{
                backgroundColor: '#2d5fa6',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              サインインする
            </Button>
          </Section>
          <Text style={{ color: '#7a7269', fontSize: '13px', lineHeight: '1.6' }}>
            このメールに心当たりがない場合は、無視してください。パスワードは変更されません。
          </Text>
          <Text style={{ color: '#b0a99f', fontSize: '12px', marginTop: '24px', borderTop: '1px solid #e2ddd7', paddingTop: '16px' }}>
            RateGen — 適正単価を3秒で。フリーランス保護新法対応の契約書を1クリックで。
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
