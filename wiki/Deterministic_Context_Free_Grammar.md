# Deterministic Context Free Grammar
## Push-down Automaton
<center>
 <img src='/Pushdown_Automation.png' width='50%' />
</center>

A pushdown automaton is a 6-tuple $(Q, \Sigma, \Gamma, \delta, q_0, F )$, where $Q$, $\Sigma$,
$\Gamma$, and $F$ are all finite sets, and
1. $Q$ is the set of states,
2. $\Sigma$ is the input alphabet,
3. $\Gamma$ is the stack alphabet,
4. $\delta: Q \times \Sigma_{\epsilon} \times \Gamma_{\epsilon} \to P(Q \times \Gamma_{\epsilon})$ is the transition function,
5. $q_0 \in Q$ is the start state, and
6. $F \subseteq Q$ is the set of accept states.

## Deterministic Push-down Automaton (DPDA)
There is exactly one $\delta(q, a, x), \delta(q, a, \epsilon), \delta(q, \epsilon, x),
\delta(q, \epsilon, \epsilon)$ exists. In finite automata, an $\epsilon$ is undeterministic because it allows you to proceed or
not. While in DPDA, an $\epsilon$ move has higher priority than others — it is prohibited from processing
a symbol when you can take an $\epsilon$ move.

## Deterministic Context Free Language (DCFL)
DCFL are languages recognize by DPDA.

## Context Free Grammar (CFG)
An example:
$$
A \to 0A1 \\
A \to B \\
B \to \#
$$

A context-free grammar is a 4-tuple $(V, \Sigma, R, S)$, where
1. $V$ is a finite set called the variables,
2. $\Sigma$ is a finite set, disjoint from $V$ , called the terminals,
3. $R$ is a finite set of rules, with each rule being a variable and a
string of variables and terminals, and
4. $S \in V$ is the start variable.

## Deterministic Context Free Grammar (DCFG)
DCFG is the CFG that every valid string has a forced handle, which is unique and does not depend on other strings after it, if doing a left-most substitution.

DPDA and DCFG are equivalent in endmarked languages[1]. All DCFGs could be converted to DPDA, while only DPDA that recognizes an endmarked language has an equivalent DCFG. "Without endmarkers, DCFGs generate only a subclass of the DCFLs — those that are prefix-free (see Problem 2.52). Note that every endmarked language is prefix-free."

A Grammar $G$ passes the $DK$-test if and only if $G$ is a DCFG.

See example 2.64 in *Introduction to the Theory of Computation*. An LR(1) is not necessary a DCFG. Every LR(k) grammar has an equivalent DPDA, and every DPDA that recognizes an end-marked language has an equivalent DCFG. Example 2.64 is an end-marked language. This does sound like an LR(1) should be a DCFG. But, note that the DCFG constructed by a DPDA is not equivalent to the LR(1) constructing the DPDA. Though this does imply they have the same power. It's just that LR(1) is more *convenient* to describe some grammar.

[1] Endmarked string: strings that end with, say, $\dashv$.

## Reference
Michael Sipser, Introduction to the Theory of Computation, page 101 - 162