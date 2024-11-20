import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Globe, Users, DollarSign, Building, Briefcase } from 'lucide-react'

interface Company {
  id: string
  name: string
  industry: string
  size: string
  location: string
  revenue: string
  website?: string
  employees?: string
  founded?: string
  description?: string
}

const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp', industry: 'Technology', size: '201-500', location: 'San Francisco, CA', revenue: '$50M-$100M' },
  { id: '2', name: 'HealthPlus', industry: 'Healthcare', size: '501-1000', location: 'Boston, MA', revenue: '$100M-$500M' },
  { id: '3', name: 'FinanceNow', industry: 'Finance', size: '1001+', location: 'New York, NY', revenue: '$500M-$1B' },
]

const enrichmentWorkflows = [
  { id: 'website', name: 'Find Website', icon: Globe },
  { id: 'employees', name: 'Get Employee Count', icon: Users },
  { id: 'revenue', name: 'Estimate Revenue', icon: DollarSign },
  { id: 'founded', name: 'Find Founding Year', icon: Building },
  { id: 'description', name: 'Generate Description', icon: Briefcase },
]

export default function DataEnrichmentView() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([])
  const [enrichmentProgress, setEnrichmentProgress] = useState<number>(0)
  const [isEnriching, setIsEnriching] = useState<boolean>(false)

  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const toggleWorkflowSelection = (workflowId: string) => {
    setSelectedWorkflows(prev => 
      prev.includes(workflowId)
        ? prev.filter(id => id !== workflowId)
        : [...prev, workflowId]
    )
  }

  const runEnrichment = async () => {
    setIsEnriching(true)
    setEnrichmentProgress(0)

    const totalSteps = selectedCompanies.length * selectedWorkflows.length
    let completedSteps = 0

    for (const companyId of selectedCompanies) {
      for (const workflowId of selectedWorkflows) {
        // Simulate API call for each workflow
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setCompanies(prev => prev.map(company => {
          if (company.id === companyId) {
            switch (workflowId) {
              case 'website':
                return { ...company, website: `https://www.${company.name.toLowerCase()}.com` }
              case 'employees':
                return { ...company, employees: `${Math.floor(Math.random() * 1000) + 100}` }
              case 'revenue':
                return { ...company, revenue: `$${Math.floor(Math.random() * 900) + 100}M` }
              case 'founded':
                return { ...company, founded: `${Math.floor(Math.random() * 30) + 1990}` }
              case 'description':
                return { ...company, description: `${company.name} is a leading ${company.industry} company...` }
              default:
                return company
            }
          }
          return company
        }))

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
          <CardTitle>Data Enrichment</CardTitle>
          <CardDescription>Select companies and workflows to enrich your data</CardDescription>
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
                  <TableHead>Size</TableHead>
                  <TableHead>Location</TableHead>
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
                    <TableCell>{company.size}</TableCell>
                    <TableCell>{company.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Workflows</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {enrichmentWorkflows.map((workflow) => (
                <Button
                  key={workflow.id}
                  variant={selectedWorkflows.includes(workflow.id) ? "default" : "outline"}
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => toggleWorkflowSelection(workflow.id)}
                >
                  <workflow.icon className="h-6 w-6 mb-2" />
                  {workflow.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={runEnrichment} 
            disabled={selectedCompanies.length === 0 || selectedWorkflows.length === 0 || isEnriching}
            className="w-full"
          >
            {isEnriching ? 'Enriching...' : 'Run Enrichment'}
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

      <Card>
        <CardHeader>
          <CardTitle>Enriched Data</CardTitle>
          <CardDescription>View the enriched company data below</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Founded</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.size}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>{company.revenue}</TableCell>
                  <TableCell>{company.website || '-'}</TableCell>
                  <TableCell>{company.employees || '-'}</TableCell>
                  <TableCell>{company.founded || '-'}</TableCell>
                  <TableCell>{company.description ? `${company.description.slice(0, 50)}...` : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
