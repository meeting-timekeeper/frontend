import { Link } from 'react-router-dom';
import { Users, Share2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Top() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              MEETINGOOD
            </h1>
            <p className="text-lg md:text-xl text-primary mb-8 font-medium">
              スムーズな会議、はじめの一歩
            </p>
            <div className="max-w-3xl mx-auto mb-8 md:mb-12">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
                会議の司会や進行に不安を感じていませんか？「何を話せばいいのか」「時間が足りない」といった悩みを解決するウェブアプリです。このアプリは、会議のアジェンダ作成から時間管理まで、初心者でも簡単にスムーズな会議を運営できるようサポートします。
              </p>
            </div>
            <Link to="/new">
              <Button
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-primary hover:bg-primary/90"
              >
                今すぐ会議を作成する
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-primary-foreground">
                      1
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      テンプレートで会議の流れを作成
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    アジェンダのテンプレートを使えば、会議の目的や参加者に合わせて最適な流れを簡単に作れます。
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-primary-foreground">
                      2
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Share2 className="w-6 h-6 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      共有リンクで参加者と情報共有
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    作成したアジェンダは共有リンクで簡単に送ることができ、参加者全員が事前に内容を確認できます。
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-primary-foreground">
                      3
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      タイマーで時間管理
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    アジェンダの各項目に設定した時間をタイマーが管理し、時間になると通知してくれます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Top;
