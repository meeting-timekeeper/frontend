export interface MeetingData {
  meeting_id: string;
  meeting_name: string;
  agenda: Array<{
    order: number;
    title: string;
    duration_minutes: number;
  }>;
}
