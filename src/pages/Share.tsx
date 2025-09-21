import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function Share() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (!meetingId) return;
    const url = `${window.location.origin}/meetings/${meetingId}`;
    setShareUrl(url);
  }, [meetingId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  //そのミーティングIDに対応するデータの有無に関わらずリンクを発行してる
  if (!meetingId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              会議データが見つかりません
            </p>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link to="/">ホームに戻る</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            会議の共有
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            参加者にリンクを共有して会議を開始しましょう
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">共有リンク</CardTitle>
              <CardDescription className="text-sm md:text-base">
                このリンクを参加者に送信してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="font-mono text-xs md:text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  className="shrink-0 bg-transparent"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-600">
                  リンクをコピーしました！
                </p>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
              asChild
            >
              <Link to={`/meetings/${meetingId}`}>
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                会議画面へ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
