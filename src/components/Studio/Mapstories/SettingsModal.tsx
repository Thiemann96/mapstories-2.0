'use client'

import { Button } from '@/src/components/Elements/Button'
import { Modal } from '@/src/components/Modal'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { toast } from '@/src/lib/toast'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Input, InputLabel } from '../../Elements/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/src/app/i18n/client'
import { Textarea, TextareaLabel } from '@/src/components/Elements/Textarea'
import useStory from '@/src/lib/api/story/useStory'
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import { useBoundStore } from '@/src/lib/store/store'
import { updateMapstorySchema } from '@/src/lib/validations/mapstory'
import Switch from '../../Elements/Switch'
// import { useUIStore } from '@/src/lib/store/ui'
// import { useS3Upload } from "next-s3-upload";

type FormData = z.infer<typeof updateMapstorySchema>

const options: Pick<DropdownMenuItemProps, 'children'>[] = [
  { children: 'Theme 1' },
  { children: 'Theme 2' },
  { children: 'Theme 3' },
  { children: 'Theme 4' },
  { children: 'Theme 5' },
]

export default function SettingsModal({
  storyId,
  shadow,
}: {
  storyId: string
  shadow?: boolean
}) {
  const router = useRouter()
  const lng = useBoundStore(state => state.language)
  const { t } = useTranslation(lng, ['settingsModal', 'studio'])
  const [isSaving, setIsSaving] = useState(false)
  const [image, setImage] = useState<string | any>()
  const [selectedTheme, setSelectedTheme] = useState('')

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(updateMapstorySchema),
  })

  const { story, updateStory } = useStory(storyId)

  const [modalOpen, setModalOpen] = useState(false)

  // let { uploadToS3 } = useS3Upload();

  function handleImageUpload(event: any) {
    const file = event.target.files[0]
    // let { url } = await uploadToS3(file);

    // console.log("Successfully uploaded to S3!", url);
  }

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    try {
      const updatedStory = await updateStory({
        ...data,
        // TODO: update again after zod schema change
        visibility: data.visibility === true ? 'PUBLIC' : 'PRIVATE',
      })
      toast({
        message: t('settingsModal:changesApplied'),
        type: 'success',
      })
      if (updatedStory?.slug !== story?.slug) {
        router.replace(`/studio/${updatedStory?.slug}`)
      }
      setModalOpen(false)
    } catch (e) {
      return toast({
        title: t('studio:somethingWrong'),
        message: t('settingsModal:changesNotApplied'),
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!story) {
    return <></>
  }

  return (
    <>
      <Button
        className={shadow ? 're-basic-box' : ''}
        disabled={!story}
        onClick={() => setModalOpen(true)}
        startIcon={<Cog6ToothIcon className="w-5" />}
        variant={'inverse'}
      >
        {t('settingsModal:options')}
      </Button>
      <Modal
        onClose={() => setModalOpen(false)}
        show={modalOpen}
        title={t('settingsModal:name')}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content>
            <InputLabel>{t('settingsModal:name')}</InputLabel>
            <Input
              defaultValue={story.name || ''}
              errors={errors.name}
              label={t('settingsModal:name')}
              size={100}
              {...register('name')}
            />
            <TextareaLabel>{t('settingsModal:description')}</TextareaLabel>
            <Textarea
              cols={60}
              defaultValue={story.description || ''}
              errors={errors.description}
              label={t('settingsModal:description')}
              rows={5}
              {...register('description')}
            ></Textarea>

            <Controller
              control={control}
              defaultValue={false}
              name="visibility"
              // {...register('visibility')}
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <div className="jusify-center flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {t('settingsModal:private')}
                    </span>
                    <Switch
                      defaultChecked={story.visibility === 'PUBLIC'}
                      onCheckedChange={onChange}
                      ref={ref}
                    ></Switch>

                    <span className="text-sm font-medium text-gray-700">
                      {t('settingsModal:public')}
                    </span>
                  </div>
                )
              }}
            />
            {/* <Spacer />
          <select {...register('theme')}>
            {options.map((option, index) => (
              <option
                key={index}
                {...option}
                onSelect={() => {
                  setSelectedTheme(option.children as string)
                  setValue('theme', option.children as string)
                }}
              />
            ))}
          </select> */}
            {/* <DropdownMenu {...register('theme')}>
            <DropdownMenu.Trigger className="focus:ring-brand-900 flex items-center gap-2 overflow-hidden focus:ring-2 focus:ring-offset-2 focus-visible:outline-none">
              <span className="mb-2 flex text-sm font-medium text-gray-700">
                {t('theme')} <ChevronDownIcon className="mt-[0.15em] h-2 w-4" />
              </span>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="absolute z-50 md:w-[240px]"
              >
                {options.map((option, index) => (
                  <DropdownMenu.Item
                    key={index}
                    {...option}
                    onSelect={() => {
                      setSelectedTheme(option.children as string)
                      setValue('theme', option.children as string)
                    }}
                  />
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu> */}
            {/* <Spacer />
          <InputLabel>{t('image')}</InputLabel>
          <div className="flex">
            <label htmlFor="imageupload">
              <div className="flex h-9 w-10 cursor-pointer items-center justify-center rounded border border-slate-300 hover:border-slate-400">
                <ChevronDownIcon className="h-4 w-4 stroke-2" />
              </div>
            </label>
            <Input
              accept="image/*"
              className="hidden"
              errors={errors.image}
              id="imageupload"
              onChange={e => handleImageUpload(e)}
              type="file"
              // {...register('image')}
            ></Input>
            <Input
              errors={errors.image}
              label="Bild"
              placeholder="Wähle ein Bild aus oder gib eine URL ein"
              size={100}
              value={image}
              {...register('image')}
            ></Input>
          </div> */}
          </Modal.Content>
          <Modal.Footer>
            <Button
              className="w-full"
              disabled={isSaving}
              isLoading={isSaving}
              type="submit"
              variant={'inverse'}
            >
              {t('settingsModal:save')}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}
