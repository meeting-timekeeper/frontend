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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6">
        <h2 className="text-5xl text-center">{meetingData.meeting_name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="flex flex-col items-center justify-center mb-6">
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
              <Progress value={progress} className="w-full" />
              <p className="text-center text-xl font-mono">
                残り時間: {Math.floor(remainingTime / 60)}:
                {String(remainingTime % 60).padStart(2, '0')}
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setCurrentItemIndex((i) => i - 1)}
                  disabled={currentItemIndex === meetingData.agenda.length}
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
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              アジェンダ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {meetingData.agenda.map((v, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border rounded-lg p-3 hover:bg-muted transition"
                >
                  <span className="font-medium text-xs">{v.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {v.duration_minutes}分
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}
