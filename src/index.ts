import { messagingApi } from '@line/bot-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import config from './config';

// 前回実行日時
let date: Date;
// LINE botクライアント
const CLIENT = new messagingApi.MessagingApiClient({ channelAccessToken: config.channelAccessToken });
// インターホン(FlashAir)のリクエスト送信間隔
const INTERVAL = config.interval;

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  // 前回実行からの経過時間
  const elapsedTime = date ? Date.now() - date.getTime() : Number.MAX_SAFE_INTEGER;

  if (INTERVAL * 2 < elapsedTime) {
    // 前回実行から1分以上経っている場合は「ピンポーン」
    await CLIENT.broadcast({
      messages: [
        {
          type: 'text',
          text: '「ピンポーン」',
        },
      ],
    });
    date = new Date();
  } else if (elapsedTime < INTERVAL) {
    // 前回実行から30秒以内の場合は何もしない
  } else if (INTERVAL <= elapsedTime) {
    // 前回実行から30秒以上経っている場合は「・・・・・」＆日時をクリア
    await CLIENT.broadcast({
      messages: [
        {
          type: 'text',
          text: '「・・・・・」',
        },
      ],
    });
    date = null;
  }

  return {
    statusCode: 200,
    body: 'OK',
  };
}
