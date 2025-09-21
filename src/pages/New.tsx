import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MEETING_TEMPLATES } from '@/templates';

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const schema = z.object({
  meeting_name: z.string().min(2, '2文字以上で入力してください'),
  template_id: z.string().min(1, 'テンプレートを選択してください'),
});

type FormValues = z.infer<typeof schema>;

const New = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { meeting_name: '', template_id: '' },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    // 選択テンプレを取得して agenda を作る
    const tpl = MEETING_TEMPLATES.find(
      (t) => String(t.meeting_id) === data.template_id
    );
    if (!tpl) {
      form.setError('template_id', { message: 'テンプレートが見つかりません' });
      return;
    }

    const payload = {
      meeting_name: data.meeting_name,
      // サーバの期待形に合わせて agenda 配列をそのまま or 変換
      agenda: tpl.agenda.map((a) => ({
        order: a.order,
        title: a.title,
        duration_minutes: a.duration_minutes,
      })),
    };
    console.log(payload);

    try {
      const res = await fetch(`${api_base_url}/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      console.log('登録成功:', result);
      const meeting_id: string = result.meeting_id;
      navigate(`/meetings/${meeting_id}/share`)
    } catch (err) {
      console.error('送信エラー:', err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <header className="relative h-14">
        <Button
          variant="outline"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
          onClick={() => navigate(-1)}
        >
          戻る
        </Button>
        <h1 className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
          会議を作成
        </h1>
      </header>

      <p className="text-center my-4 text-gray-500">
        会議の基本情報を設定します。
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
        >
          {/* 会議名 */}
          <FormField
            control={form.control}
            name="meeting_name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-medium">会議名</FormLabel>
                <FormControl>
                  <Input
                    placeholder="例: 週次MTG"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* テンプレート選択 */}
          <FormField
            control={form.control}
            name="template_id"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-medium">
                  テンプレート
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="テンプレートを選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-50 bg-white">
                    {MEETING_TEMPLATES.map((v) => (
                      <SelectItem
                        key={v.meeting_id}
                        value={String(v.meeting_id)}
                      >
                        {v.meeting_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-3">
            <Button type="submit" className="w-full md:w-auto">
              作成
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default New;
