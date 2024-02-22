import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import * as Dialog from '@radix-ui/react-dialog';

const createTagSchema = z.object({
	name: z.string().min(3, { message: 'Minimun 3 caracters' }),
	slug: z.string(),
});

type CreateTagSchema = z.infer<typeof createTagSchema>;

export function CreateTagForm() {
	function createSlug(input: string): string {
		return input
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^\w\s-]/g, '')
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	// Validation form
	const { register, handleSubmit, watch } = useForm<CreateTagSchema>({
		resolver: zodResolver(createTagSchema),
	});

	function createTag(data: CreateTagSchema) {
		console.log(data);
	}

	const slug = watch('name') && createSlug(watch('name'));
	return (
		<form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
			<div className="space-y-2">
				<label htmlFor="tag" className="text-sm font-medium block">
					Tag name
				</label>
				<input
					{...register('name')}
					id="tag"
					type="text"
					className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
				/>
			</div>
			<div className="space-y-2">
				<label htmlFor="slug" className="text-sm font-medium block">
					Slug
				</label>
				<input
					{...register('slug')}
					value={slug}
					id="slug"
					type="text"
					readOnly
					className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
				/>
			</div>
			<div className="flex items-center justify-end gap-2">
				<Dialog.Close asChild>
					<Button>
						<X className="size-3" /> Cancel
					</Button>
				</Dialog.Close>
				<Button type="submit" className="bg-teal-400 text-teal-950">
					<Check className="size-3" />
					Save
				</Button>
			</div>
		</form>
	);
}
