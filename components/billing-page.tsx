"use client"

import { CreditCard, Download, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPricing, formatPrice } from "@/config/pricing"
import { useState } from "react"

const invoices = [
  { date: "Nov 1, 2024", description: "ATTACHAI Platform – Monthly", amount: "£1800", status: "Paid" },
  { date: "Oct 1, 2024", description: "ATTACHAI Platform – Monthly", amount: "£1800", status: "Paid" },
  { date: "Sep 1, 2024", description: "ATTACHAI Platform – Monthly", amount: "£1800", status: "Paid" },
]

export function BillingPage() {
  const pricing = getPricing()
  const currentTier = pricing.tiers[1] // Current active tier: Signature

  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [cardNumber, setCardNumber] = useState("4242424242424242")
  const [expiryMonth, setExpiryMonth] = useState("10")
  const [expiryYear, setExpiryYear] = useState("27")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  const handleDownloadInvoice = (invoice: (typeof invoices)[0]) => {
    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice - ${invoice.date}</title>
        <link href="https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;500&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #EBE4D8;
            padding: 40px;
            margin: 0;
          }
          .invoice {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 60px;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(139, 115, 85, 0.1);
          }
          .header {
            font-family: 'Spectral', serif;
            font-size: 32px;
            font-weight: 400;
            color: #6E5A4F;
            margin-bottom: 40px;
            text-align: center;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .section {
            margin-bottom: 30px;
          }
          .label {
            font-size: 11px;
            color: #8B7355;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
            font-weight: 300;
          }
          .value {
            font-size: 16px;
            color: #6E5A4F;
            font-weight: 300;
          }
          .amount {
            font-family: 'Spectral', serif;
            font-size: 48px;
            color: #6E5A4F;
            text-align: center;
            margin: 40px 0;
          }
          .status {
            display: inline-block;
            padding: 8px 20px;
            background: rgba(216, 200, 168, 0.2);
            color: #8B7355;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 300;
          }
          .divider {
            height: 1px;
            background: rgba(213, 200, 186, 0.3);
            margin: 30px 0;
          }
          .footer {
            text-align: center;
            color: #8B7355;
            font-size: 12px;
            margin-top: 50px;
            font-weight: 300;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">ATTACHAI Invoice</div>
          
          <div class="section">
            <div class="label">Invoice Date</div>
            <div class="value">${invoice.date}</div>
          </div>

          <div class="divider"></div>

          <div class="section">
            <div class="label">Description</div>
            <div class="value">${invoice.description}</div>
          </div>

          <div class="divider"></div>

          <div class="amount">${invoice.amount}</div>

          <div style="text-align: center; margin-bottom: 30px;">
            <span class="status">${invoice.status}</span>
          </div>

          <div class="divider"></div>

          <div class="grid">
            <div class="section">
              <div class="label">Billed To</div>
              <div class="value">ATTACHAI Club<br>billing@attachaiclub.com</div>
            </div>
            <div class="section">
              <div class="label">Payment Method</div>
              <div class="value">Visa ending in 4242<br>Charged on ${invoice.date}</div>
            </div>
          </div>

          <div class="footer">
            Thank you for your business<br>
            For questions, contact billing@attachaiclub.com
          </div>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([invoiceHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ATTACHAI-Invoice-${invoice.date.replace(/\s+/g, "-")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="space-y-4 md:space-y-8">
        {/* Plan & Status */}
        <div className="backdrop-blur-3xl bg-white/40 rounded-[18px] md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
          <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-3 md:mb-6">
            PLAN & STATUS
          </h2>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-0">
            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="text-[10px] md:text-sm font-light text-[#6E5A4F] mb-1">Current Plan</div>
                <div className="text-base md:text-xl font-serif font-normal text-[#6E5A4F] uppercase tracking-wider">
                  {currentTier.name}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div>
                  <div className="text-[9px] md:text-xs font-light text-[#6E5A4F] mb-1">Monthly Cost</div>
                  <div className="text-xs md:text-sm font-light text-[#6E5A4F]">
                    {formatPrice(currentTier.monthlyPrice, pricing.currencySymbol)} / month per location
                  </div>
                </div>
                <div>
                  <div className="text-[9px] md:text-xs font-light text-[#6E5A4F] mb-1">Next Charge</div>
                  <div className="text-xs md:text-sm font-light text-[#6E5A4F]">Dec 1, 2024 • £1800</div>
                </div>
              </div>

              <Badge className="rounded-full px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-light bg-[#D8C8A8]/20 text-[#8B7355] border-0 shadow-sm">
                Active
              </Badge>
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
              <div className="flex justify-end w-full">
                <Button className="h-9 md:h-auto px-4 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-light bg-[#D8C8A8]/30 text-[#6E5A4F] hover:bg-[#D8C8A8]/40 border-0 shadow-sm transition-all duration-900">
                  Change Plan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="backdrop-blur-3xl bg-white/40 rounded-[18px] md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
          <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-3 md:mb-6">
            PAYMENT METHOD
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-[12px] md:rounded-[14px] bg-[#D8C8A8]/20 flex items-center justify-center backdrop-blur-xl">
                <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-[#8B7355]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-xs md:text-sm font-light text-[#6E5A4F] mb-0.5 md:mb-1">•••• •••• •••• 4242</div>
                <div className="text-[10px] md:text-xs font-light text-[#6E5A4F]">Expires 10/27 • Visa</div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="h-9 md:h-auto px-4 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-light text-[#8B7355] hover:bg-white/50 border border-[#D8C8A8]/30 transition-all duration-900 w-full md:w-auto"
              onClick={() => setShowPaymentDialog(true)}
            >
              Manage Payment Methods
            </Button>
          </div>
        </div>

        {/* Invoices & History */}
        <div className="backdrop-blur-3xl bg-white/40 rounded-[18px] md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
          <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-3 md:mb-6">
            INVOICES & HISTORY
          </h2>

          <div className="space-y-3 md:space-y-4">
            {invoices.map((invoice, index) => (
              <div key={index} className="flex items-start justify-between gap-3 md:gap-4">
                <div className="space-y-1 flex-1">
                  <div className="text-[10px] md:text-xs font-light text-[#6E5A4F]">{invoice.date}</div>
                  <div className="text-xs md:text-sm font-light text-[#6E5A4F]">{invoice.description}</div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  <div className="text-xs md:text-sm font-light text-[#6E5A4F]">{invoice.amount}</div>
                  <Badge className="rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-light bg-[#D8C8A8]/20 text-[#8B7355] border-0">
                    {invoice.status}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-[#D8C8A8]/20 transition-all duration-900"
                    onClick={() => handleDownloadInvoice(invoice)}
                  >
                    <Download className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#8B7355]" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Contacts */}
        <div className="backdrop-blur-3xl bg-white/40 rounded-[18px] md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
          <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-3 md:mb-6">
            BILLING CONTACTS
          </h2>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Mail className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355]" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="text-[10px] md:text-xs font-light text-[#6E5A4F] mb-0.5 md:mb-1">
                  Primary Billing Email
                </div>
                <div className="text-xs md:text-sm font-light text-[#6E5A4F] break-all">billing@attachaiclub.com</div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#8B7355]/60" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] md:text-xs font-light text-[#6E5A4F] mb-0.5 md:mb-1">Secondary Email</div>
                <div className="text-xs md:text-sm font-light text-[#6E5A4F] break-all">
                  operations@attachaiclub.com
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 pt-3 md:pt-4 border-t border-[#D5C8BA]/20">
              <div>
                <div className="text-xs md:text-sm font-light text-[#6E5A4F] mb-0.5 md:mb-1">
                  Send invoices to all listed emails
                </div>
                <div className="text-[10px] md:text-xs font-light text-[#6E5A4F]">
                  Both primary and secondary recipients
                </div>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-[#D8C8A8]/40 self-start md:self-auto" />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md bg-[#EBE4D8] border-0 rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#6E5A4F] uppercase tracking-wider">
              Manage Payment Methods
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Current Card Display */}
            <div className="backdrop-blur-3xl bg-white/40 rounded-[18px] p-4 shadow-sm">
              <div className="text-[10px] font-serif uppercase tracking-widest text-[#6E5A4F] mb-3">Current Card</div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-[14px] bg-[#D8C8A8]/20 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-[#8B7355]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-sm font-light text-[#6E5A4F]">•••• •••• •••• 4242</div>
                  <div className="text-xs font-light text-[#6E5A4F]">Expires 10/27 • Visa</div>
                </div>
              </div>
            </div>

            {/* Update Card Form */}
            <div className="space-y-4">
              <div className="text-[10px] font-serif uppercase tracking-widest text-[#6E5A4F] mb-2">
                Update Card Details
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-light text-[#6E5A4F]">Cardholder Name</Label>
                <Input
                  placeholder="Name on card"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="h-11 rounded-full border-[#D5C8BA]/30 bg-white/50 text-[#6E5A4F] placeholder:text-[#8B7355]/40 focus-visible:ring-[#D8C8A8]/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-light text-[#6E5A4F]">Card Number</Label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="h-11 rounded-full border-[#D5C8BA]/30 bg-white/50 text-[#6E5A4F] placeholder:text-[#8B7355]/40 focus-visible:ring-[#D8C8A8]/50"
                  maxLength={16}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-light text-[#6E5A4F]">Month</Label>
                  <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                    <SelectTrigger className="h-11 rounded-full border-[#D5C8BA]/30 bg-white/50 text-[#6E5A4F] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#EBE4D8] border-[#D5C8BA]/30">
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = String(i + 1).padStart(2, "0")
                        return (
                          <SelectItem key={month} value={month} className="text-sm">
                            {month}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-light text-[#6E5A4F]">Year</Label>
                  <Select value={expiryYear} onValueChange={setExpiryYear}>
                    <SelectTrigger className="h-11 rounded-full border-[#D5C8BA]/30 bg-white/50 text-[#6E5A4F] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#EBE4D8] border-[#D5C8BA]/30">
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = String(24 + i)
                        return (
                          <SelectItem key={year} value={year} className="text-sm">
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-light text-[#6E5A4F]">CVV</Label>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="h-11 rounded-full border-[#D5C8BA]/30 bg-white/50 text-[#6E5A4F] placeholder:text-[#8B7355]/40 focus-visible:ring-[#D8C8A8]/50"
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowPaymentDialog(false)}
                className="flex-1 h-11 rounded-full text-xs font-light text-[#8B7355] hover:bg-white/50 border border-[#D8C8A8]/30"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Save card details here
                  setShowPaymentDialog(false)
                }}
                className="flex-1 h-11 rounded-full text-xs font-light bg-gradient-to-r from-[#D8C8A8] to-[#C4B5A0] text-[#6E5A4F] hover:opacity-90 border-0 shadow-sm"
              >
                Update Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
