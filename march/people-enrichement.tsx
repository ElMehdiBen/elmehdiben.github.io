import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Mail, Phone, Briefcase } from 'lucide-react'

interface Company {
  id: string
  name: string
  industry: string
}

interface Person {
  id: string
  name: string
  jobTitle: string
  company: string
  email?: string
  phone?: string
}

const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp', industry: 'Technology' },
  { id: '2', name: 'HealthPlus', industry: 'Healthcare' },
  { id: '3', name: 'FinanceNow', industry: 'Finance' },
]

const jobTitles = [
  'CEO',
  'CTO',
  'CFO',
  'Sales Manager',
  'Marketing Director',
  'Product Manager',
  'HR Manager',
]

export default function PeopleEnrichmentView() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [enrichmentProgress, setEnrichmentProgress] = useState<number>(0)
  const [isEnriching, setIsEnriching] = useState<boolean>(false)
  const [customJobTitle, setCustomJobTitle] = useState<string>('')

  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const toggleJobTitleSelection = (jobTitle: string) => {
    setSelectedJobTitles(prev => 
      prev.includes(jobTitle)
        ? prev.filter(title => title !== jobTitle)
        : [...prev, jobTitle]
    )
  }

  const addCustomJobTitle = () => {
    if (customJobTitle && !jobTitles.includes(customJobTitle)) {
      setSelectedJobTitles(prev => [...prev, customJobTitle])
      setCustomJobTitle('')
    }
  }

  const runEnrichment = async () => {
    setIsEnriching(true)
    setEnrichmentProgress(0)
    setPeople([])

    const totalSteps = selectedCompanies.length * selectedJobTitles.length
    let completedSteps = 0

    for (const companyId of selectedCompanies) {
      const company = companies.find(c => c.id === companyId)
      if (!company) continue

      for (const jobTitle of selectedJobTitles) {
        // Simulate API call for each person
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newPerson: Person = {
          id: `${companyId}-${jobTitle.replace(/\s+/g, '-').toLowerCase()}`,
          name: `${jobTitle.split(' ')[0]} ${company.name.slice(0, 3)}son`,
          jobTitle: jobTitle,
          company: company.name,
          email: `${jobTitle.toLowerCase().replace(/\s+/g, '.')}@${company.name.toLowerCase()}.com`,
          phone: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        }

        setPeople(prev => [...prev, newPerson])

        completedSteps++
        setEnrichmentProgress(Math.round((completedSteps / totalSteps) * 100))
      }
    }

    setIsEnriching(false)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>People Enrichment</CardTitle>
          <CardDescription>Find people with specific job titles and their contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Companies</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Industry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCompanies.includes(company.id)}
                        onCheckedChange={() => toggleCompanySelection(company.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Job Titles</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {jobTitles.map((jobTitle) => (
                <Button
                  key={jobTitle}
                  variant={selectedJobTitles.includes(jobTitle) ? "default" : "outline"}
                  className="h-12 flex items-center justify-start"
                  onClick={() => toggleJobTitleSelection(jobTitle)}
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  {jobTitle}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-grow">
              <Label htmlFor="customJobTitle">Custom Job Title</Label>
              <Input
                id="customJobTitle"
                value={customJobTitle}
                onChange={(e) => setCustomJobTitle(e.target.value)}
                placeholder="Enter custom job title"
              />
            </div>
            <Button onClick={addCustomJobTitle}>Add</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={runEnrichment} 
            disabled={selectedCompanies.length === 0 || selectedJobTitles.length === 0 || isEnriching}
            className="w-full"
          >
            {isEnriching ? 'Enriching...' : 'Find People'}
          </Button>
        </CardFooter>
      </Card>

      {isEnriching && (
        <Card>
          <CardHeader>
            <CardTitle>Enrichment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={enrichmentProgress} className="w-full" />
            <p className="text-center mt-2">{enrichmentProgress}% Complete</p>
          </CardContent>
        </Card>
      )}

      {people.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>People Data</CardTitle>
            <CardDescription>Contact information for people matching the selected criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>{person.jobTitle}</TableCell>
                    <TableCell>{person.company}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {person.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {person.phone}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
