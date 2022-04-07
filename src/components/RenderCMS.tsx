import BannerText from 'src/components/sections/BannerText'
import Hero from 'src/components/sections/Hero'
import IncentivesHeader from 'src/components/sections/Incentives/IncentivesHeader'
import ProductShelf from 'src/components/sections/ProductShelf'
import ProductTiles from 'src/components/sections/ProductTiles'
import type { ComponentType } from 'react'

/**
 * Sections: Components imported from '../components/sections' only.
 * Do not import or render components from any other folder in here.
 */
const COMPONENTS: Record<string, ComponentType<any>> = {
  Hero,
  BannerText,
  IncentivesHeader,
  ProductShelf,
  ProductTiles,
}

interface Props {
  sections?: Array<{ name: string; data: unknown }>
}

function RenderCMS({ sections }: Props) {
  return (
    <>
      {sections?.map(({ name, data }, index) => {
        const Component = COMPONENTS[name]

        if (!Component) {
          throw new Error(
            `Could not find component for block ${name}. Add a new component for this block or remove it from the CMS`
          )
        }

        return <Component key={`cms-section-${index}`} {...data} />
      })}
    </>
  )
}

export default RenderCMS
