'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Clock,
  Home,
  Menu,
  X,
  SkipBack,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Toaster } from 'sonner';
const api_base_url = import.meta.env.VITE_API_BASE_URL;

interface MeetingData {
  meeting_name: string;
  agenda: Array<{
    order: number;
    title: string;
    duration_minutes: number;
  }>;
}

type Phase = 'done' | 'active' | 'todo';

export default function MeetingDetail() {
  const params = useParams<{ meetingId: string }>();
  const meetingId = params.meetingId;
  const [meetingData, setMeetingData] = useState<MeetingData | null>(null);

  // タイマー状態
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // APIからデータ取得
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await fetch(`${api_base_url}/meetings/${meetingId}`);
        if (!res.ok) throw new Error('会議データ取得エラー');
        const data: MeetingData = await res.json();
        setMeetingData(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (meetingId) fetchMeeting();
  }, [meetingId]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((t) => t + 1);
        setTotalElapsedTime((t) => t + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  if (!meetingData) {
    return <p>会議データを読み込み中...</p>;
  }

  const currentItem = meetingData.agenda[currentItemIndex];
  const currentItemDurationSeconds = currentItem.duration_minutes * 60;
  const progress = Math.min(
    (elapsedTime / currentItemDurationSeconds) * 100,
    100
  );
  const remainingTime = Math.max(currentItemDurationSeconds - elapsedTime, 0);
  const totalDuration =
    meetingData.agenda.reduce(
      (total, item) => total + item.duration_minutes,
      0
    ) * 60;

  const getPhase = (i: number) =>
    i > currentItemIndex ? 'done' : i === currentItemIndex ? 'active' : 'todo';

  const phaseStyles: Record<Phase, string> = {
    // 終わった項目：ほんのり緑
    done: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/60 text-emerald-700 dark:text-emerald-300',
    // いまの項目：プライマリを強調
    active:
      'bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/40',
    // これからの項目：通常
    todo: 'bg-card border-border text-foreground/80 hover:bg-muted',
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6">
        <h2 className="text-5xl text-center">{meetingData.meeting_name}</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 min-h-screengap-4 min-h-screen">
        <div className="md:flex-[2]">
          <Card className="flex flex-col items-center justify-center mb-6 bg-secondary">
            <CardHeader className="text-center w-full">
              <p>Step{currentItemIndex + 1}</p>
              <CardTitle className="text-xl font-semibold">
                {currentItem.title}
              </CardTitle>
              <CardDescription>
                予定時間: {currentItem.duration_minutes}分
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full space-y-4">
              <div className="flex justify-around items-center text-3xl font-mono">
                <p className="text-center text-5xl font-mono font-bold text-primary">
                  {Math.floor(elapsedTime / 60)}:
                  {String(elapsedTime % 60).padStart(2, '0')}
                </p>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-center text-xl font-mono">
                残り時間: {Math.floor(remainingTime / 60)}:
                {String(remainingTime % 60).padStart(2, '0')}
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setCurrentItemIndex((i) => i - 1)}
                  disabled={currentItemIndex === 0}
                >
                  <SkipBack />
                </Button>
                <Button onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? <Pause /> : <Play />}
                </Button>
                <Button
                  onClick={() => setCurrentItemIndex((i) => i + 1)}
                  disabled={currentItemIndex === meetingData.agenda.length - 1}
                >
                  <SkipForward className="primary" />
                </Button>
                <Button
                  onClick={() => {
                    setElapsedTime(0);
                    setIsRunning(false);
                  }}
                >
                  <RotateCcw />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                会議情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">会議名: {meetingData.meeting_name}</p>
              <p>合計予定時間: {totalDuration / 60}分</p>
              <p>
                現在の議題: {currentItemIndex + 1} / {meetingData.agenda.length}
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="md:flex-[1]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              アジェンダ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {meetingData.agenda.map((v, i) => {
                const phase = getPhase(i);

                return (
                  <li
                    key={i}
                    className={[
                      'flex items-center justify-between rounded-xl border p-3 transition',
                      phaseStyles[phase],
                    ].join(' ')}
                    aria-current={phase === 'active' ? 'step' : undefined}
                  >
                    <span className="font-medium">{v.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {v.duration_minutes}分
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}
