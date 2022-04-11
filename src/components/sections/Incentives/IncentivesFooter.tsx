import Incentives from './Incentives'

function IncentivesFooter() {
  const incentives = [
    {
      icon: 'ShieldCheck',
      firstLineText: 'Trusted',
      secondLineText: 'by SafeCon',
    },
    {
      icon: 'Medal',
      firstLineText: 'Quality',
      secondLineText: 'Products',
    },
    {
      icon: 'CircleWavyCheck',
      firstLineText: '3-years',
      secondLineText: 'Guarantee',
    },
    {
      icon: 'Storefront',
      firstLineText: 'Pickup',
      secondLineText: 'Options',
    },
    {
      icon: 'Truck',
      firstLineText: 'Free',
      secondLineText: 'Shipping',
    },
  ]

  return <Incentives incentives={incentives} />
}

export default IncentivesFooter
