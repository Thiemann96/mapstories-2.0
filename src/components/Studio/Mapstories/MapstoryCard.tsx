'use client'

import * as React from 'react'
import { Story } from '@prisma/client'

import { Card } from '@/src/components/Card'
import { Button } from '@/src/components/Elements/Button'
import Link from 'next/link'
import DeleteMapstoryButton from './DeleteMapstoryButton'

type Props = {
  mapstory: Story
}

export function MapstoryCard({ mapstory }: Props) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{mapstory.name}</Card.Title>
      </Card.Header>
      <Card.Footer>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link href={`/studio/${mapstory.slug}`}>
              <Button variant={'inverse'}>Bearbeiten</Button>
            </Link>
            <Link href={`/studio/${mapstory.slug}`}>
              <Button>Spielen</Button>
            </Link>
          </div>
          <DeleteMapstoryButton id={mapstory.id} />
        </div>
      </Card.Footer>
    </Card>
  )
}