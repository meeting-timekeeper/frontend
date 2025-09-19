import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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

const schema = z.object({
  title: z.string().min(2, '2文字以上で入力してください'),
  minutes: z.coerce.number().int().positive('正の整数で入力してください'),
  templete_id: z.coerce.number().int(),
});

type FormValues = z.infer<typeof schema>;

const New = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', minutes: 60, templete_id: 0 },
  });

  const onSubmit = (data: FormValues) => {
    console.log('data:', data);
  };
  return (
    <div className="mx-auto max-w-2xl p-6">
      <header className="relative h-14">
        <Link to="/" className="absolute left-4 top-1/2 -translate-y-1/2">
          <Button variant="outline">戻る</Button>
        </Link>
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
          <FormField
            control={form.control}
            name="title"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 左：所要時間 */}
            {/* 右：テンプレート */}
            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-base font-medium">
                    所要時間
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="templete"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-base font-medium">
                    テンプレート
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="テンプレートを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='z-50 bg-white'>
                      <SelectItem value="0">初めての方</SelectItem>
                      <SelectItem value="1">定例会議</SelectItem>
                      <SelectItem value="2">ブレスト</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
