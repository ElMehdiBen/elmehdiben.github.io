import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ResearchResult {
  id: string
  companyName: string
  industry: string
  size: string
  location: string
  revenue: string
}

export default function ResearchView() {
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [otherCriteria, setOtherCriteria] = useState('')
  const [researchChannel, setResearchChannel] = useState('')
  const [results, setResults] = useState<ResearchResult[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend and get real results
    // For demonstration, we'll generate some mock results
    const mockResults: ResearchResult[] = [
      { id: '1', companyName: 'TechCorp', industry: 'Technology', size: '201-500', location: 'San Francisco, CA', revenue: '$50M-$100M' },
      { id: '2', companyName: 'HealthPlus', industry: 'Healthcare', size: '501-1000', location: 'Boston, MA', revenue: '$100M-$500M' },
      { id: '3', companyName: 'FinanceNow', industry: 'Finance', size: '1001+', location: 'New York, NY', revenue: '$500M-$1B' },
    ]
    setResults(mockResults)
  }

  return (
    <div className="space-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Research Criteria</CardTitle>
          <CardDescription>Input criteria to find target companies for your sales efforts.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Technology, Healthcare, Finance"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select value={companySize} onValueChange={setCompanySize} required>
                <SelectTrigger id="companySize">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501-1000">501-1000 employees</SelectItem>
                  <SelectItem value="1001+">1001+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="otherCriteria">Other Criteria</Label>
              <Textarea
                id="otherCriteria"
                value={otherCriteria}
                onChange={(e) => setOtherCriteria(e.target.value)}
                placeholder="Enter any additional criteria for target companies"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="researchChannel">Research Channel</Label>
              <Select value={researchChannel} onValueChange={setResearchChannel} required>
                <SelectTrigger id="researchChannel">
                  <SelectValue placeholder="Select research channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="crunchbase">Crunchbase</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit Research Criteria</Button>
          </CardFooter>
        </form>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Research Results</CardTitle>
            <CardDescription>Companies matching your research criteria</CardDescription>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.companyName}</TableCell>
                    <TableCell>{result.industry}</TableCell>
                    <TableCell>{result.size}</TableCell>
                    <TableCell>{result.location}</TableCell>
                    <TableCell>{result.revenue}</TableCell>
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
