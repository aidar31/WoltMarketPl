import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Это настоящие деньги?",
    answer:
      "Нет, платформа работает в тестовой сети Solana Devnet. Все токены и операции происходят в безопасной среде без использования реальных денег.",
  },
  {
    question: "Что нужно для начала работы?",
    answer:
      "Вам понадобится кошелёк Phantom (или другой совместимый с Solana) и регистрация на платформе. Мы предоставим подробную инструкцию по настройке.",
  },
  {
    question: "Сколько стоит использование платформы?",
    answer:
      "Тестирование на демо-бирже полностью бесплатно. Вы можете создавать токены и торговать без каких-либо комиссий в тестовой среде.",
  },
  {
    question: "Можно ли перенести токен в основную сеть?",
    answer:
      "Да, после успешного тестирования мы поможем вам запустить токен в основной сети Solana с соблюдением всех требований и процедур.",
  },
  {
    question: "Какие документы нужны для KYC?",
    answer:
      "Для верификации бизнеса потребуются документы о регистрации компании, информация о владельцах и основной деятельности. Полный список предоставляется при регистрации.",
  },
  {
    question: "Есть ли ограничения на создание токенов?",
    answer:
      "В тестовой среде ограничений практически нет. Вы можете создавать множество токенов для экспериментов и изучения различных сценариев.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 text-balance">Часто задаваемые вопросы</h2>
          <p className="text-xl text-muted-foreground text-pretty">Ответы на основные вопросы о платформе</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
              <AccordionTrigger className="text-left text-foreground hover:text-secondary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
