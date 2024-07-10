import { Button } from '../../app/_components/Button'
import { Gutter } from '../../app/_components/Gutter'
import { VerticalPadding } from '../../app/_components/VerticalPadding'

export default function NotFound() {
  return (
    <Gutter>
      <VerticalPadding top="none" bottom="large">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p>This page could not be found.</p>
        <Button href="/" label="Go Home" appearance="primary" />
      </VerticalPadding>
    </Gutter>
  )
}
