import { zodResolver } from '@hookform/resolvers/zod';
import { useBack } from '@refinedev/core';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb';
import { CreateView } from '@/components/refine-ui/views/create-view';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { classSchema } from '@/lib/schema';

const Create = () => {
    const back = useBack();

    const form = useForm<z.infer<typeof classSchema>>({
        resolver: zodResolver(classSchema),
        defaultValues: {
            name: '',
            description: '',
            subjectId: 1,
            teacherId: '',
            capacity: 30,
            status: 'active',
            bannerUrl: 'https://example.com/banner.jpg',
            bannerCldPubId: 'placeholder-banner',
            inviteCode: '',
        },
    });

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = form;

    const onSubmit = (values: z.infer<typeof classSchema>) => {
        console.log(values);
    };

    const subjects = [
        {
            id: 1,
            name: 'Mathematics',
            code: 'MATH',
        },
        {
            id: 2,
            name: 'Computer Science',
            code: 'CS',
        },
        {
            id: 3,
            name: 'Physics',
            code: 'PHY',
        },
    ];

    const teachers = [
        {
            id: 1,
            name: 'Dr Balen Shah',
        },
        {
            id: 2,
            name: 'KP Oli',
        },
        {
            id: 3,
            name: 'Rabi Bhai',
        },
    ];

    return (
        <CreateView className='create-view'>
            <Breadcrumb />
            <h1 className='page-title'>Create a Class</h1>

            <div className='intro-row'>
                <p>Provide the required information below to add a class.</p>
                <Button onClick={back}>go back</Button>
            </div>

            <Separator className='bg-transparent' />

            <div className='my-4 flex items-center'>
                <Card className='class-form-card w-full'>
                    <CardHeader className='relative z-10'>
                        <CardTitle className='pb-0 text-2xl font-bold'>
                            Fill out the form
                        </CardTitle>
                    </CardHeader>

                    <Separator className='bg-transparent' />

                    <CardContent className='mt-7'>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                                <div className='space-y-3'>
                                    <Label>
                                        Banner Image <span className='text-orange-600'>*</span>
                                    </Label>
                                    <p>Upload Image Widget</p>
                                </div>

                                <FormField
                                    control={control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Class Name <span className='text-orange-600'>*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Intro to Biology - Section A'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <FormField
                                        control={control}
                                        name='subjectId'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Subject <span className='text-orange-600'>*</span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={value => field.onChange(Number(value))}
                                                    value={field?.value.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select a subject' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {subjects.map(subject => (
                                                            <SelectItem
                                                                value={subject.id.toString()}
                                                                key={subject.id}
                                                            >
                                                                {subject.name}, ({subject.code})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name='teacherId'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Teacher <span className='text-orange-600'>*</span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={value => field.onChange(Number(value))}
                                                    value={field?.value.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select a teacher' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {teachers.map(teacher => (
                                                            <SelectItem
                                                                value={teacher.id.toString()}
                                                                key={teacher.id}
                                                            >
                                                                {teacher.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='grid sm:grid-cols-2 gap-4'>
                                    <FormField
                                        control={control}
                                        name='capacity'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Capacity <span className='text-orange-500'>*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='number'
                                                        placeholder='30'
                                                        onChange={e => {
                                                            const value = e.target.value;
                                                            field.onChange(value ? Number(value) : undefined);
                                                        }}
                                                        value={(field.value as number | undefined) ?? ''}
                                                        name={field.name}
                                                        ref={field.ref}
                                                        onBlur={field.onBlur}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name='status'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Status <span className='text-orange-500'>*</span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select Status' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='active'>Active</SelectItem>
                                                        <SelectItem value='inactive'>Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='grid sm:grid-cols-2 gap-4'>
                                    <FormField
                                        control={control}
                                        name='description'
                                        render={({ field }) => (
                                            <FormItem className='col-span-2'>
                                                <FormLabel className='w-full'>Description</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Brief description about the class
'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button
                                    className='w-full'
                                    type='submit'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Creating...' : 'Create'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </CreateView>
    );
};

export default Create;
