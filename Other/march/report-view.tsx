'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Person {
  id: string
  name: string
  jobTitle: string
  email: string
  phone: string
}

interface Company {
  id: string
  name: string
  industry: string
  size: string
  location: string
  revenue: string
  website: string
  description: string
  people: Person[]
}

const mockData: Company[] = [
  {
    id: '1',
    name: 'TechCorp',
    industry: 'Technology',
    size: '201-500',
    location: 'San Francisco, CA',
    revenue: '$50M-$100M',
    website: 'https://techcorp.com',
    description: 'Leading provider of innovative software solutions',
    people: [
      { id: '1', name: 'John Doe', jobTitle: 'CEO', email: 'john@techcorp.com', phone: '+1 (555) 123-4567' },
      { id: '2', name: 'Jane Smith', jobTitle: 'CTO', email: 'jane@techcorp.com', phone: '+1 (555) 987-6543' },
    ]
  },
  {
    id: '2',
    name: 'HealthPlus',
    industry: 'Healthcare',
    size: '501-1000',
    location: 'Boston, MA',
    revenue: '$100M-$500M',
    website: 'https://healthplus.com',
    description: 'Innovative healthcare solutions for modern hospitals',
    people: [
      { id: '3', name: 'Alice Johnson', jobTitle: 'COO', email: 'alice@healthplus.com', phone: '+1 (555) 246-8135' },
      { id: '4', name: 'Bob Williams', jobTitle: 'CMO', email: 'bob@healthplus.com', phone: '+1 (555) 369-2580' },
    ]
  },
]

export default function ReportView() {
  const { t } = useTranslation()
  const [companies] = useState<Company[]>(mockData)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('Report')}</CardTitle>
        <CardDescription>{t('Summary of companies and people found')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {companies.map((company) => (
            <div key={company.id} className="space-y-4">
              <h2 className="text-2xl font-bold">{company.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">{t('Industry')}</h3>
                  <p>{company.industry}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t('Size')}</h3>
                  <p>{company.size}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t('Location')}</h3>
                  <p>{company.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t('Revenue')}</h3>
                  <p>{company.revenue}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t('Website')}</h3>
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {company.website}
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{t('Description')}</h3>
                <p>{company.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('People')}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('Name')}</TableHead>
                      <TableHead>{t('Job Title')}</TableHead>
                      <TableHead>{t('Email')}</TableHead>
                      <TableHead>{t('Phone')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {company.people.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell>{person.name}</TableCell>
                        <TableCell>{person.jobTitle}</TableCell>
                        <TableCell>{person.email}</TableCell>
                        <TableCell>{person.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">{t('Summary')}</h2>
          <div className="flex space-x-4">
            <Badge variant="secondary" className="text-lg py-1 px-2">
              {t('Companies')}: {companies.length}
            </Badge>
            <Badge variant="secondary" className="text-lg py-1 px-2">
              {t('People')}: {companies.reduce((sum, company) => sum + company.people.length, 0)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
